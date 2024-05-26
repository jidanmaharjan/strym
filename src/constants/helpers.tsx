export function generatePrimaryAndSecondaryColors() {
  // Generating random values for red, green, and blue components
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Converting decimal to hex for primary color
  const primaryColor = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  // Manipulating the RGB values to generate a complementary color for secondary color
  const secondaryColor = `#${(255 - r).toString(16).padStart(2, "0")}${(255 - g)
    .toString(16)
    .padStart(2, "0")}${(255 - b).toString(16).padStart(2, "0")}`;

  return { primaryColor, secondaryColor };
}

const avatarColorsArray = [
  { primaryColor: "#9C3D54", secondaryColor: "#E5BFC9" },
  { primaryColor: "#A05195", secondaryColor: "#E7C7D5" },
  { primaryColor: "#D45087", secondaryColor: "#F6C6D7" },
  { primaryColor: "#F95D6A", secondaryColor: "#FFD0D5" },
  { primaryColor: "#FF7C43", secondaryColor: "#FFD1C7" },
  { primaryColor: "#FF9B21", secondaryColor: "#FFE0B9" },
  { primaryColor: "#FFCB11", secondaryColor: "#FFF5CC" },
  { primaryColor: "#FFD45A", secondaryColor: "#FFF4DE" },
  { primaryColor: "#D5F60E", secondaryColor: "#F8FFCF" },
  { primaryColor: "#79EDDA", secondaryColor: "#D9F6F3" },
  { primaryColor: "#2BCF6D", secondaryColor: "#B4F2CB" },
  { primaryColor: "#24B9C9", secondaryColor: "#A0E8F1" },
  { primaryColor: "#2B88D9", secondaryColor: "#A9DFF3" },
  { primaryColor: "#3B5AA6", secondaryColor: "#A4AED3" },
  { primaryColor: "#45258A", secondaryColor: "#8771B9" },
  { primaryColor: "#541E7A", secondaryColor: "#8D71B9" },
  { primaryColor: "#651E6E", secondaryColor: "#9865AC" },
  { primaryColor: "#80246D", secondaryColor: "#AB6AAB" },
  { primaryColor: "#A32B6E", secondaryColor: "#C881B4" },
  { primaryColor: "#D8385E", secondaryColor: "#F0A7A7" },
  { primaryColor: "#F76D54", secondaryColor: "#FFBCAD" },
  { primaryColor: "#FF9D3D", secondaryColor: "#FFD4B3" },
  { primaryColor: "#FFCD00", secondaryColor: "#FFEB99" },
  { primaryColor: "#F1ED6E", secondaryColor: "#FFF9CF" },
  { primaryColor: "#B6F06D", secondaryColor: "#EAFEC2" },
  { primaryColor: "#4DF3E0", secondaryColor: "#B9FDF7" },
  { primaryColor: "#4EB0E8", secondaryColor: "#B6E5F8" },
  { primaryColor: "#747BF8", secondaryColor: "#C3CFFB" },
  { primaryColor: "#A56EF4", secondaryColor: "#D2B6FA" },
  { primaryColor: "#DD61E6", secondaryColor: "#F4B2F6" },
  { primaryColor: "#FF6885", secondaryColor: "#FFC1D2" },
  { primaryColor: "#FF7C4D", secondaryColor: "#FFD5C2" },
  { primaryColor: "#FFA93D", secondaryColor: "#FFDDB3" },
  { primaryColor: "#FFD037", secondaryColor: "#FFEAAA" },
  { primaryColor: "#E8D936", secondaryColor: "#FFF6C3" },
  { primaryColor: "#A3E265", secondaryColor: "#D5F0B7" },
  { primaryColor: "#57C9DA", secondaryColor: "#A1E9F3" },
  { primaryColor: "#5E97F7", secondaryColor: "#B4CFFD" },
  { primaryColor: "#8A6DF7", secondaryColor: "#C9B4FA" },
  { primaryColor: "#BA6FF1", secondaryColor: "#E2BFF9" },
  { primaryColor: "#E86FDE", secondaryColor: "#F8CFF4" },
  { primaryColor: "#FF748A", secondaryColor: "#FFD0D4" },
  { primaryColor: "#FF8773", secondaryColor: "#FFD0C7" },
  { primaryColor: "#FFA251", secondaryColor: "#FFDDC2" },
  { primaryColor: "#FFD13C", secondaryColor: "#FFEAAA" },
  { primaryColor: "#E0DC35", secondaryColor: "#FFF6C2" },
  { primaryColor: "#95E06A", secondaryColor: "#D6F8C7" },
  { primaryColor: "#4BC2E1", secondaryColor: "#A4EAF1" },
  { primaryColor: "#519CF8", secondaryColor: "#B2CFFF" },
  { primaryColor: "#7777F8", secondaryColor: "#C1C1FC" },
  { primaryColor: "#A46AF4", secondaryColor: "#D3BFFA" },
];

export function getRandomColorPair() {
  const randomIndex = Math.floor(Math.random() * avatarColorsArray.length);
  return avatarColorsArray[randomIndex];
}

export const getTimeStringFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds) - minutes * 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const getTimeStringFromMilliseconds = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes < 10 ? "0" + minutes : minutes} : ${
    seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60
  }`;
};
