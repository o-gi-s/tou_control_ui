import $ from "jquery";
import { ATTRIBUTE_NAME } from "../constant/attributeName";

type $VideoElement = JQuery<HTMLVideoElement>;

export const getVideo = (): $VideoElement =>
  $(`#${ATTRIBUTE_NAME.VIDEO}`) as $VideoElement;

export const onEnded = (callback: () => void) => ($video: $VideoElement) =>
  $video.on("ended", callback);

export const offEnded = ($video: $VideoElement) => $video.off("ended");

export const videoListener = (fn: ($video: $VideoElement) => void) =>
  fn(getVideo());
