/** @typedef {{stream: MediaStream, audioCtx: AudioContext, chunks: Float32Array[]}} AudioCaptureState */

/**
 *
 * @returns {AudioCaptureState}
 */
export async function beginAudioCapture() {
  const stream = await navigator.mediaDevices
    .getUserMedia({
      audio: {
        autoGainControl: false,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        sampleSize: 32,
      },
    })
    .catch((error) => {
      alert("You have to enable microphone access");
      throw error;
    });

  const audioCtx = new AudioContext();

  const chunks = [];
  const processor = audioCtx.createScriptProcessor(4096, 1, 0);
  processor.onaudioprocess = (e) => {
    chunks.push(e.inputBuffer.getChannelData(0));
  };

  audioCtx.createMediaStreamSource(stream).connect(processor);

  return { stream, audioCtx, chunks };
}

/**
 *
 * @param {AudioCaptureState} param0
 * @returns
 */
export function endAudioCapture({ stream, audioCtx, chunks }) {
  stream.getTracks().forEach((t) => t.stop());
  audioCtx.close();

  return chunks.map((a) => Array.from(a)).flat();
}
