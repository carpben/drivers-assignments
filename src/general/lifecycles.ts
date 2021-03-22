import { EffectCallback, useEffect, useRef } from "react";

export const useMountEffect = (fun: EffectCallback) => {
  return useEffect(fun, []);
};
