export function Button(text = "", onClick?: string) {
  return `<button onclick="${onClick}">${text}</button>`;
}
