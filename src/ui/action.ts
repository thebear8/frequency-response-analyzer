export function Action(name: string, action: any): string {
  (window as Record<string, any>)[name] = action;
  return `${name}()`;
}
