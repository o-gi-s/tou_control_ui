import React, { FC } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import { Dir } from "../types";

export interface ProgressBtnProps {
  onClick?: (dir: Dir) => void;
}

/**
 * Functional component.
 * @param props
 */
export const ProgressBtn: FC<ProgressBtnProps> = ({ onClick = () => {} }) => {
  return (
    <ButtonGroup disableElevation variant="text" color="primary">
      <Button onClick={() => onClick(-1)}>&lt;&lt; 前の動画</Button>
      <Button onClick={() => onClick(1)}>次の動画 &gt;&gt;</Button>
    </ButtonGroup>
  );
};
