import { css } from "@emotion/react";

export const getShadow = (
  elevation: number = 3,
  opacityRatio: number = 1 / 2
) => {
  if (elevation === 0) {
    return "";
  }

  const extraEl = elevation - 1;

  const getSize = (v1: number, v24: number) =>
    `${v1 + Math.round(((v24 - v1) / 23) * extraEl)}px`;

  const getShade = (
    y: number[],
    blur: number[],
    spread: number[],
    alpha: number
  ) =>
    `0 ${getSize(y[0], y[1])} ${getSize(blur[0], blur[1])} ${getSize(
      spread[0],
      spread[1]
    )} rgba(0,0,0,${alpha})`;

  return css`
    box-shadow: ${getShade([2, 11], [1, 15], [-1, -7], opacityRatio * 0.2)},
      ${getShade([1, 24], [1, 38], [0, 3], opacityRatio * 0.14)},
      ${getShade([1, 9], [3, 46], [0, 8], opacityRatio * 0.12)};
  `;
};
