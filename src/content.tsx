import React from "react";
import ReactDOM from "react-dom";
import { Box } from "@material-ui/core";
import { SwitchBtn } from "./features/controlPanel/components/SwitchBtn";
import { ProgressBtn } from "./features/controlPanel/components/ProgressBtn";
import { useVideoLoaded } from "./hooks/useVideoLoaded";
import {
  getNextLectureBtn,
  getPrevLectureBtn,
  clickLectureBtn
} from "./util/btn";
import { isEnableAutoPlay, setStorageValue } from "./util/storage";
import { getVideo, onEnded, offEnded, videoListener } from "./util/video";
import { Dir } from "./features/controlPanel/types";

const Main = () => {
  useVideoLoaded(() => {
    if (isEnableAutoPlay()) {
      videoListener(onEnded(() => clickLectureBtn(getNextLectureBtn)));
      getVideo()
        .get(0)
        .play();
    } else {
      videoListener(offEnded);
    }
  });

  const onChange = (isActive: boolean) => {
    setStorageValue(isActive);
    videoListener(
      isActive ? onEnded(() => clickLectureBtn(getNextLectureBtn)) : offEnded
    );
  };

  const onClick = (dir: Dir) => {
    clickLectureBtn(dir === 1 ? getNextLectureBtn : getPrevLectureBtn);
  };

  return (
    <Box
      textAlign="center"
      position="fixed"
      bottom="30px"
      right="30px"
      bgcolor="#e8e8e8"
      borderRadius="14px"
      padding="20px"
      boxShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    >
      <SwitchBtn defaultChecked={isEnableAutoPlay()} {...{ onChange }} />
      <ProgressBtn {...{ onClick }} />
    </Box>
  );
};

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
