export default function load_settings(selector) {
  const elm = document.querySelector(selector);
  return JSON.parse(elm.value);
}
