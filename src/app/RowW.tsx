/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { stopAllPropagation } from "../general/dom";
import { getShadow } from "../general/style";
import { DRFC } from "../general/types";

interface Props {
  handler?: () => unknown;
  styleMode?: ROW_STYLE_MODE;
}

export enum ROW_STYLE_MODE {
  HEIGHLIGHT,
  BLUR,
}

const RowW: DRFC<Props> = (props) => {
  const { handler, styleMode, ...otherProps } = props;

  return (
    <div
      css={[
        {
          padding: "5px 15px",
          borderTop: `1px solid #ddd`,
          cursor: handler ? "pointer" : "unset",
        },
        styleMode === ROW_STYLE_MODE.HEIGHLIGHT
          ? [
              getShadow(2, 1),
              {
                backgroundColor: "white",
                borderRadius: 3,
              },
            ]
          : styleMode === ROW_STYLE_MODE.BLUR
          ? {
              filter: "blur(5px)",
            }
          : undefined,
      ]}
      {...otherProps}
      onClick={
        handler
          ? (e) => {
              stopAllPropagation(e);
              handler();
            }
          : undefined
      }
    />
  );
};

export default RowW;
