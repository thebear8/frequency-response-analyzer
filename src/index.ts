import Button from "./ui/button";
import { Action } from "./ui/action";

document.querySelector("html")!.style.width = "100%";
document.querySelector("html")!.style.height = "100%";
document.querySelector("body")!.style.width = "100%";
document.querySelector("body")!.style.height = "100%";

document.body.innerHTML = Button(
  "Hello World",
  Action("showHello", () => alert("Hello"))
);
