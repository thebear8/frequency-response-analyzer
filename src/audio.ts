export type AudioCaptureState = {
  stream: MediaStream;
  audioCtx: AudioContext;
  chunks: Float32Array[];
};

export async function beginAudioCapture(): Promise<AudioCaptureState> {
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

  const chunks = [] as Float32Array[];
  const processor = audioCtx.createScriptProcessor(4096, 1, 0);
  processor.onaudioprocess = (e) => {
    chunks.push(e.inputBuffer.getChannelData(0));
  };

  audioCtx.createMediaStreamSource(stream).connect(processor);

  return { stream, audioCtx, chunks };
}

export function endAudioCapture({
  stream,
  audioCtx,
  chunks,
}: AudioCaptureState) {
  stream.getTracks().forEach((t) => t.stop());
  audioCtx.close();

  return chunks.map((a) => Array.from(a)).flat();
}
