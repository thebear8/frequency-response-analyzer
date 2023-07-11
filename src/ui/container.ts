export function Row(...children: string[]) {
  const inner = children.join("");
  return `<div style="display: flex; flex-direction: row;">${inner}</div>`;
}

export function Column(...children: string[]) {
  const inner = children.join("");
  return `<div style="display: flex; flex-direction: column;">${inner}</div>`;
}
