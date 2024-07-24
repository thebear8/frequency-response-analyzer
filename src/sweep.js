export function linspace(start, stop, num) {
  return Array.from(Array(num)).map(
    (_, idx) => (idx / num) * (stop - start) + start
  );
}

export function calculateExponentialSineSweep(
  f1 = 20,
  f2 = 20000,
  T = 10,
  fs = 48000
) {
  console.log(linspace(0, 1, 100));

  const R = Math.log(f2 / f1);
  const t = linspace(0, T, fs * T);
  return t.map((t) =>
    Math.sin(((2 * Math.PI * f1 * T) / R) * (Math.exp(t * (R / T)) - 1))
  );
}

export function calculateExponentialSineSweepFFTCorrection(T = 10, fs = 48000) {
  const R = f2 / f1;
  const t = linspace(0, T, fs * T);
  return t.map((t) => Math.exp((t * R) / T));
}
