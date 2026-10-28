// 停止仅因链接进入视口而下载页面；Link 的悬停/触摸 preload 继续使用官方实现。
export default function prefetchOnVisibility() {
  return Promise.resolve();
}
