export interface RGBAColour {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function convertHSLAToRGBA(h: number, s: number, l: number, a: number): RGBAColour {
  let rgba: RGBAColour;
  h = convertToPercent(Math.round(h) % 360, 360);
  s = convertToPercent(Math.round(s) % 101, 100);
  l = convertToPercent(Math.round(l) % 101, 100);

  if (s === 0) {
    const value = Math.round(Math.round(255 * l));
    rgba = {
      r: value,
      g: value,
      b: value,
      a: a,
    };
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    rgba = {
      r: parseInt((convertHueToRGB(p, q, h + 1 / 3) * 256).toFixed(0), 10),
      g: parseInt((convertHueToRGB(p, q, h) * 256).toFixed(0), 10),
      b: parseInt((convertHueToRGB(p, q, h - 1 / 3) * 256).toFixed(0), 10),
      a: a,
    };
  }
  return rgba;
}

function convertToPercent(amount: number, limit: number): number {
  return amount / limit;
}

var convertHueToRGB = function(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};
