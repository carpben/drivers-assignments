/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { stopAllPropagation } from "../general/dom";
import { DRFC } from "../general/types";

interface Props {
  name: string;
  id: string;
}

const DriverRow: DRFC<Props> = (props) => {
  const { name, id, ...otherProps } = props;

  return (
    <div
      css={{
        display: "flex",
      }}
    >
      <div
        css={{
          flexBasis: "40%",
          flexShrink: 0,
        }}
      >
        {name}
      </div>
      <div
        css={{
          flexBasis: "60%",
          flexShrink: 0,
        }}
      >
        {id}
      </div>
    </div>
  );
};

export default DriverRow;
