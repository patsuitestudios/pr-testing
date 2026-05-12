interface Color {
  name: string;
  hex: string;
  rgb: [number, number, number];
  category: string;
}

const PALETTE: Color[] = [
  { name: "Crimson", hex: "#DC143C", rgb: [220, 20, 60], category: "red" },
  { name: "Coral", hex: "#FF7F50", rgb: [255, 127, 80], category: "orange" },
  { name: "Goldenrod", hex: "#DAA520", rgb: [218, 165, 32], category: "yellow" },
  { name: "Emerald", hex: "#50C878", rgb: [80, 200, 120], category: "green" },
  { name: "Cerulean", hex: "#007BA7", rgb: [0, 123, 167], category: "blue" },
  { name: "Indigo", hex: "#4B0082", rgb: [75, 0, 130], category: "purple" },
  { name: "Magenta", hex: "#FF00FF", rgb: [255, 0, 255], category: "pink" },
  { name: "Teal", hex: "#008080", rgb: [0, 128, 128], category: "green" },
  { name: "Sienna", hex: "#A0522D", rgb: [160, 82, 45], category: "brown" },
  { name: "Slate", hex: "#708090", rgb: [112, 128, 144], category: "gray" },
  { name: "Turquoise", hex: "#40E0D0", rgb: [64, 224, 208], category: "blue" },
  { name: "Lavender", hex: "#E6E6FA", rgb: [230, 230, 250], category: "purple" },
  { name: "Chartreuse", hex: "#7FFF00", rgb: [127, 255, 0], category: "green" },
  { name: "Persimmon", hex: "#EC5800", rgb: [236, 88, 0], category: "orange" },
  { name: "Vermilion", hex: "#E34234", rgb: [227, 66, 52], category: "red" },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function renderSwatch(color: Color): string {
  const [r, g, b] = color.rgb;
  const bg = `\x1b[48;2;${r};${g};${b}m`;
  const fg = luminance(r, g, b) > 0.2 ? "\x1b[30m" : "\x1b[97m";
  const reset = "\x1b[0m";
  const block = `${bg}${fg}  ${color.name.padEnd(14)}${reset}`;
  return block;
}

function formatColorInfo(color: Color): string {
  const [h, s, l] = rgbToHsl(...color.rgb);
  const lum = luminance(...color.rgb).toFixed(3);
  const lines = [
    "",
    `  🎨  Your random color: ${color.name}`,
    "",
    `  Category    : ${color.category}`,
    `  HEX         : ${color.hex}`,
    `  RGB         : rgb(${color.rgb.join(", ")})`,
    `  HSL         : hsl(${h}, ${s}%, ${l}%)`,
    `  Luminance   : ${lum}`,
    "",
    `  Swatch      : ${renderSwatch(color)}`,
    "",
  ];
  return lines.join("\n");
}

function main() {
  const color = pickRandom(PALETTE);
  console.log(formatColorInfo(color));
}

main();
