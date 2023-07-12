import { Button } from "./ui/button";
import { Action } from "./ui/action";
import { Row } from "./ui/container";
import { AudioCaptureState, beginAudioCapture, endAudioCapture } from "./audio";
import { dft, fft } from "./fft";

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

async function begin() {
  audioState = await beginAudioCapture();
}

async function end() {
  if (!audioState) return;

  const hanning = (k: number, N: number) =>
    0.5 * (1 - Math.cos((2 * Math.PI * k) / (N - 1)));

  const samples = endAudioCapture(audioState);
  const windowedSamples = samples.map((s, k) => s * hanning(k, samples.length));

  while (windowedSamples.length & (windowedSamples.length - 1))
    windowedSamples.push(0);

  const [fftReal, fftImag] = fft(
    windowedSamples,
    Array.from(windowedSamples, () => 0)
  );

  console.log("FFT: ");
  console.log(fftReal);
  console.log(fftImag);

  const [dftReal, dftImag] = dft(
    windowedSamples,
    Array.from(windowedSamples, () => 0)
  );

  console.log("DFT: ");
  console.log(dftReal);
  console.log(dftImag);
}

render(() =>
  Row(
    Button("Begin capturing audio", Action("begin", begin)),
    Button("End capturing audio", Action("end", end))
  )
);

const signal = Array.from(Array(8), (_, i) => Math.sin(i));
const [dftReal, dftImag] = dft(signal, signal);
const [fftReal, fftImag] = fft(signal, signal);

console.log("Real: ");
console.log("DFT: ", dftReal);
console.log("FFT: ", fftReal);

console.log("Imaginary: ");
console.log("DFT: ", dftImag);
console.log("FFT: ", fftImag);
