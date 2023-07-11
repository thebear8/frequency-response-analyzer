export function Action(name: string, action: () => void): string {
  const actions = ((window as any).actions ??= {}) as any;

  if (Object.keys(actions).includes(name))
    console.log(`Action ${name} is already defined`);

  actions[name] = action;
  return `window.actions.${name}()`;
}
