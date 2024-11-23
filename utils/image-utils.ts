import { themes } from "./themes";

export function convertImageToTheme(imageData: ImageData, theme: number[]): ImageData {
  const pixels = imageData.data;
  const numPixels = pixels.length;

  for (let i = 0; i < numPixels; i += 4) {
    let closestColor = findClosestColor(pixels.slice(i, i + 3), theme);
    pixels[i] = closestColor[0];
    pixels[i + 1] = closestColor[1];
    pixels[i + 2] = closestColor[2];
  }

  return imageData;
}

function findClosestColor(pixel: Uint8ClampedArray, theme: number[]): number[] {
  let closestDistanceSquared = Infinity;
  let closestColor: number[] = [];

  for (let i = 0; i < theme.length; i += 3) {
    const distanceSquared =
      Math.pow(pixel[0] - theme[i], 2) +
      Math.pow(pixel[1] - theme[i + 1], 2) +
      Math.pow(pixel[2] - theme[i + 2], 2);

    if (distanceSquared < closestDistanceSquared) {
      closestDistanceSquared = distanceSquared;
      closestColor = theme.slice(i, i + 3);
    }
  }

  return closestColor;
}

export { themes };

