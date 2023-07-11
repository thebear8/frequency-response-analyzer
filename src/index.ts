import { Button } from "./ui/button";
import { Action } from "./ui/action";
import { Row } from "./ui/container";
import { AudioCaptureState, beginAudioCapture, endAudioCapture } from "./audio";

function render(component: () => string) {
  const html = document.querySelector("html")!;
  const body = document.querySelector("body")!;

  html.style.width = "100%";
  html.style.height = "100%";
  body.style.margin = "0";
  body.style.width = "100%";
  body.style.height = "100%";
  body.style.margin = "0";

  body.innerHTML = component();
}

let audioState = undefined as AudioCaptureState | undefined;

render(() =>
  Row(
    Button(
      "Begin capturing audio",
      Action(
        "beginCapture",
        async () => (audioState = await beginAudioCapture())
      )
    ),
    Button(
      "End capturing audio",
      Action(
        "endCapture",
        () => audioState && console.log(endAudioCapture(audioState))
      )
    )
  )
);
