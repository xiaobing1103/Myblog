export const progressKey = 'java-course-progress-v1';
export const draftKey = id => `java-course-draft-v1:${id}`;
export function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(progressKey) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {return {};}
}
export function savePassed(id) {
  try {
    localStorage.setItem(progressKey, JSON.stringify({...readProgress(), [id]: true}));
    window.dispatchEvent(new Event('java-progress'));
  } catch {}
}
