// 此模块先于 viewer.mjs 注册初始化事件；不改动官方渲染代码。
function syncTheme() {
  try {document.documentElement.dataset.blogTheme = parent.document.documentElement.dataset.theme || 'light';}
  catch {document.documentElement.dataset.blogTheme = 'light';}
}
syncTheme();
try {new MutationObserver(syncTheme).observe(parent.document.documentElement, {attributes: true, attributeFilter: ['data-theme']});} catch {}
function configure(event) {
  if (event.detail.source !== window) return;
  const options = window.PDFViewerApplicationOptions;
  options.set('disablePreferences', true);
  options.set('defaultUrl', '');
  options.set('localeProperties', {lang: 'zh-CN'});
  options.set('enableScripting', false);
  options.set('isEvalSupported', false);
  options.set('enablePermissions', true);
  // 支持 Range 的主机只读取当前页需要的字节；搜索时仍可按需补齐全文。
  options.set('disableAutoFetch', true);
  options.set('disableStream', true);
  event.currentTarget.removeEventListener('webviewerloaded', configure);
}
try {parent.document.addEventListener('webviewerloaded', configure);} catch {document.addEventListener('webviewerloaded', configure);}
