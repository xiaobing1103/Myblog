const $ = selector => document.querySelector(selector);
const state = {page: 1, size: 10, query: '', total: 0, booksRequest: 0, loansRequest: 0};

export async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options, headers: {'Accept': 'application/json', ...(options.body ? {'Content-Type': 'application/json'} : {}), ...options.headers},
  });
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `请求失败（HTTP ${response.status}）`);
  }
  return response.status === 204 ? null : response.json();
}

function notify(message, kind = 'info') {
  $('#notice').textContent = message;
  $('#notice').dataset.kind = kind;
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = String(text);
  if (className) node.className = className;
  return node;
}

function emptyRow(body, text) {
  const row = element('tr');
  const cell = element('td', text, 'empty'); cell.colSpan = 3;
  row.append(cell); body.replaceChildren(row);
}

function action(text, className, callback) {
  const button = element('button', text, className);
  button.type = 'button';
  button.addEventListener('click', () => runAction(button, callback));
  return button;
}

export async function runAction(button, callback) {
  button.disabled = true;
  try { await callback(); }
  catch (error) { notify(error.message || '连接失败，请确认后端服务仍在运行。', 'error'); }
  finally { button.disabled = false; }
}

function renderBooks(books) {
  const body = $('#books'); body.replaceChildren();
  if (!books.length) {emptyRow(body, '没有匹配的图书。可以更换关键词或先录入一本书。'); return;}
  for (const book of books) {
    const row = element('tr'); row.dataset.bookId = book.id;
    const name = element('td'); name.append(element('strong', book.title), element('small', `${book.author} · #${book.id}`));
    const stock = element('td', `${book.availableCopies} / ${book.totalCopies}`);
    const cell = element('td'), actions = element('div', undefined, 'actions');
    const borrow = action('借阅', '', async () => {
      const borrower = $('#borrower');
      if (!borrower.reportValidity()) return;
      await request('/api/loans', {method: 'POST', body: JSON.stringify({bookId: book.id, borrower: borrower.value})});
      notify(`已借出《${book.title}》，可借库存已更新。`, 'success');
      await refresh();
    });
    borrow.disabled = book.availableCopies === 0;
    borrow.setAttribute('aria-label', `借阅 ${book.title}`);
    const remove = action('删除', 'danger', async () => {
      if (!confirm(`删除《${book.title}》？有借阅历史的图书将由服务器拒绝删除。`)) return;
      await request(`/api/books/${book.id}`, {method: 'DELETE'});
      notify('已删除没有借阅历史的图书。', 'success');
      await loadBooks();
    });
    remove.setAttribute('aria-label', `删除 ${book.title}`);
    actions.append(borrow, remove); cell.append(actions); row.append(name, stock, cell); body.append(row);
  }
}

export async function loadBooks() {
  const version = ++state.booksRequest;
  $('#book-summary').textContent = '正在加载图书…';
  $('#previous-page').disabled = true; $('#next-page').disabled = true;
  const query = new URLSearchParams({q: state.query, page: state.page, size: state.size});
  const result = await request(`/api/books?${query}`);
  if (version !== state.booksRequest) return;
  state.total = result.total;
  const lastPage = Math.max(1, Math.ceil(result.total / state.size));
  if (state.page > lastPage) {state.page = lastPage; return loadBooks();}
  renderBooks(result.items);
  $('#book-summary').textContent = `共 ${result.total} 本书目`;
  $('#page-label').textContent = `第 ${state.page} / ${lastPage} 页`;
  $('#previous-page').disabled = state.page <= 1;
  $('#next-page').disabled = state.page >= lastPage;
}

function renderLoans(loans) {
  const body = $('#loans'); body.replaceChildren();
  if (!loans.length) {emptyRow(body, '当前范围暂无借阅记录。'); return;}
  for (const loan of loans) {
    const row = element('tr'); row.dataset.loanId = loan.id;
    const name = element('td'); name.append(element('strong', loan.bookTitle), element('small', `${loan.borrower} · 借阅 #${loan.id}`));
    const date = element('td', new Date(loan.createdAt).toLocaleString('zh-CN'));
    const status = element('td');
    if (loan.returnedAt) {status.append(element('strong', '已归还'), element('small', new Date(loan.returnedAt).toLocaleString('zh-CN')));}
    else {
      const button = action('归还', 'secondary', async () => {
        await request(`/api/loans/${loan.id}/return`, {method: 'POST'});
        notify(`《${loan.bookTitle}》已归还，库存恢复一次。`, 'success');
        await refresh();
      });
      button.setAttribute('aria-label', `归还 ${loan.bookTitle} 借阅 ${loan.id}`);
      status.append(button);
    }
    row.append(name, date, status); body.append(row);
  }
}

export async function loadLoans() {
  const version = ++state.loansRequest;
  const active = $('#loan-filter').value;
  const loans = await request(`/api/loans${active ? `?active=${active}` : ''}`);
  if (version === state.loansRequest) renderLoans(loans);
}

export async function refresh() { await Promise.all([loadBooks(), loadLoans()]); }

$('#book-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget, button = form.querySelector('button');
  runAction(button, async () => {
    const input = new FormData(form);
    await request('/api/books', {method: 'POST', body: JSON.stringify({title: input.get('title'), author: input.get('author'), totalCopies: Number(input.get('totalCopies'))})});
    form.reset(); state.query = ''; state.page = 1; $('#query').value = '';
    notify('图书录入成功。填写借阅人后可以开始借阅。', 'success');
    await loadBooks();
  });
});
$('#search-form').addEventListener('submit', event => {
  event.preventDefault(); state.query = $('#query').value; state.page = 1;
  runAction(event.currentTarget.querySelector('button'), loadBooks);
});
$('#previous-page').addEventListener('click', () => {if (state.page > 1) {state.page--; loadBooks().catch(error => notify(error.message, 'error'));}});
$('#next-page').addEventListener('click', () => {if (state.page * state.size < state.total) {state.page++; loadBooks().catch(error => notify(error.message, 'error'));}});
$('#loan-filter').addEventListener('change', () => loadLoans().catch(error => notify(error.message, 'error')));
refresh().then(() => notify('服务已连接。先录入图书，再体验搜索、借阅和归还。')).catch(error => notify(error.message, 'error'));
