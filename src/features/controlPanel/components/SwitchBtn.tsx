import React, { FC, useState } from "react";
import { Box, FormControlLabel, Switch } from "@material-ui/core";

export interface SwitchBtnProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * スイッチボタン
 * @param props
 */
export const SwitchBtn: FC<SwitchBtnProps> = ({
  defaultChecked = false,
  onChange
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={isChecked}
            onChange={() => {
              setIsChecked(state => {
                const nextState = !state;
                if (onChange) onChange(nextState);
                return nextState;
              });
            }}
            name="checkedB"
            color="secondary"
          />
        }
        label={<span style={{ color: "#222" }}>連続自動再生</span>}
      />
    </Box>
  );
};
