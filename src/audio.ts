async function beginAudioCapture() {
  const md = new MediaDevices();

  const stream = await md
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

function endAudioCapture({
  stream,
  audioCtx,
  chunks,
}: {
  stream: MediaStream;
  audioCtx: AudioContext;
  chunks: Float32Array[];
}) {
  stream.getTracks().forEach((t) => t.stop());
  audioCtx.close();

  console.log("Hello World");
}
