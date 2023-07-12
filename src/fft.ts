export function dft(real: number[], imag: number[]): [number[], number[]] {
  if (real.length !== imag.length)
    throw new RangeError("Real/Imaginary vector lengths have to be equal");
  if (real.length === 0) throw new RangeError("Length cannot be zero");

  const real_ = Array.from(real, () => 0);
  const imag_ = Array.from(imag, () => 0);

  for (let k = 0; k < real.length; ++k) {
    for (let t = 0; t < real.length; ++t) {
      const angle = (2 * Math.PI * t * k) / real.length;
      real_[k] += real[t] * Math.cos(angle) + imag[t] * Math.sin(angle);
      imag_[k] += -real[t] * Math.sin(angle) + imag[t] * Math.cos(angle);
    }
  }

  return [real_, imag_];
}

export function fft(real: number[], imag: number[]): [number[], number[]] {
  if (real.length !== imag.length)
    throw new RangeError("Real/Imaginary vector lengths have to be equal");
  if (real.length === 0) throw new RangeError("Length cannot be zero");
  if (real.length & (real.length - 1))
    throw new Error("Length has to be a power of two");

  if (real.length === 1) return [real, imag];

  const N = real.length;

  const [eRe, eIm] = fft(
    real.filter((_, k) => k % 2 === 0),
    imag.filter((_, k) => k % 2 === 0)
  );
  const [oRe, oIm] = fft(
    real.filter((_, k) => k % 2 === 1),
    imag.filter((_, k) => k % 2 === 1)
  );

  const tRe = Array.from(real, (_, k) => Math.cos((2 * Math.PI * k) / N));
  const tIm = Array.from(real, (_, k) => -Math.sin((2 * Math.PI * k) / N));

  const real_ = Array.from(real, () => 0);
  const imag_ = Array.from(imag, () => 0);

  const M = N / 2;
  for (let k = 0; k < M; ++k) {
    real_[k] = eRe[k] + (tRe[k] * oRe[k] - tIm[k] * oIm[k]);
    real_[k + M] = eRe[k] + (tRe[k + M] * oRe[k] - tIm[k + M] * oIm[k]);

    imag_[k] = eIm[k] + (tRe[k] * oIm[k] + tIm[k] * oRe[k]);
    imag_[k + M] = eIm[k] + (tRe[k + M] * oIm[k] + tIm[k + M] * oRe[k]);
  }

  return [real_, imag_];
}

export function fft_(real: number[], imag: number[]): [number[], number[]] {
  if (real.length !== imag.length)
    throw new RangeError("Real/Imaginary vector lengths have to be equal");
  if (real.length === 0) throw new RangeError("Length cannot be zero");
  if (real.length & (real.length - 1))
    throw new Error("Length has to be a power of two");

  if (real.length === 1) return [real, imag];
  // if (real.length <= 2) return dft(real, imag);

  // length
  const N = real.length;

  // even real, even imaginary
  const [eRe, eIm] = fft(
    real.filter((_, idx) => idx % 2 === 0),
    imag.filter((_, idx) => idx % 2 === 0)
  );

  // odd real, odd imaginary
  const [oRe, oIm] = fft(
    real.filter((_, idx) => idx % 2 === 1),
    imag.filter((_, idx) => idx % 2 === 1)
  );

  // e^-j*2*pi*k/N
  // e^i*x = cos(x) + i * sin(x)
  // e^-ix = cos(x) - i * sin(x)
  // e^-i*2*pi*k/N = cos(2*pi*k/N) - i * sin(2*pi*k/N)

  // terms real
  const tRe = Array.from(
    real,
    (_, k) => +Math.cos((2 * Math.PI * k) / real.length)
  );

  // terms imaginary
  const tIm = Array.from(
    real,
    (_, k) => -Math.sin((2 * Math.PI * k) / real.length)
  );

  const real_ = Array.from(real, () => 0);
  const imag_ = Array.from(real, () => 0);

  const M = N / 2;
  for (let k = 0; k < M; ++k) {
    real_[k] = eRe[k] + (tRe[k] * oRe[k] - tIm[k] * oIm[k]);
    real_[k + M] = eRe[k] + (tRe[k + M] * oRe[k] - tIm[k + M] * oIm[k]);

    imag_[k] = eIm[k] + (tRe[k] * oIm[k] + tIm[k] * oRe[k]);
    imag_[k + M] = eIm[k] + (tRe[k + M] * oIm[k] + tIm[k + M] * oRe[k]);
  }

  return [real_, imag_];

  /*
const real_ = [
    ...evenReal.map(
      (_, k) =>
        evenReal[k] + (termsReal[k] * oddReal[k] - termsImag[k] * oddImag[k])
    ),
    ...evenReal.map(
      (_, k) =>
        evenReal[k] +
        (termsReal[k + N / 2] * oddReal[k] - termsImag[k + N / 2] * oddImag[k])
    ),
  ];

  const imag_ = [
    ...evenImag.map(
      (_, k) =>
        evenImag[k] + (termsReal[k] * oddImag[k] + termsImag[k] * oddReal[k])
    ),
    ...evenImag.map(
      (_, k) =>
        evenImag[k] +
        (termsReal[k + N / 2] * oddImag[k] + termsImag[k + N / 2] * oddReal[k])
    ),
  ];
  */
}
