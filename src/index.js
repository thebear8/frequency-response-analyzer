import { playAudioBuffer } from "./audio";
import { calculateExponentialSineSweep } from "./sweep";

const ess = calculateExponentialSineSweep();
const play = document.getElementById("play");
play.onclick = () => playAudioBuffer(ess);
