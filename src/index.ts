import { Button } from "./ui/button";
import { Action } from "./ui/action";
import { Row } from "./ui/container";
import { AudioCaptureState, beginAudioCapture, endAudioCapture } from "./audio";
import { fft } from "./fft";
import { transform } from "./nayuki-fft";

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

const data = Array.from(Array(8), (_, i) => Math.sin(i));
console.log(data);

const [freqData, freqDataImag] = fft(
  data,
  Array.from(data, () => 0)
);

console.log(freqData);

transform(
  data,
  Array.from(data, () => 0)
);

console.log(data);
