document.querySelector("html")!.style.width = "100%";
document.querySelector("html")!.style.height = "100%";
document.querySelector("body")!.style.width = "100%";
document.querySelector("body")!.style.height = "100%";

function h1({ innerText = "" } = {}) {
  const h1 = document.createElement("h1");
  Object.assign(h1, { innerText });
  return h1;
}

function button({
  innerText = undefined as string | undefined,
  onclick = undefined as (() => void) | undefined,
} = {}) {
  const button = document.createElement("button");
  Object.assign(button, { innerText, onclick });
  return button;
}

function div(
  children: HTMLElement[],
  { display = "flex", style = "flex-direction: row" } = {}
) {
  const container = document.createElement("div");
  Object.assign(container, { display, style });
  children.forEach((c) => container.appendChild(c));
  return container;
}

document.body.appendChild(
  div([
    button({ innerText: "Hello World!" }),
    button({ innerText: "Goodbye World!" }),
  ])
);
