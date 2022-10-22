import { useEffect } from "react";
import { ATTRIBUTE_NAME } from "../constant/attributeName";
import { OBSERVER_CONFIG } from "../constant/observerConfig";

/**
 * 動画のを取得
 * @param records
 * @returns
 */
const getVideo = (records: MutationRecord[]): HTMLVideoElement => {
  let video: HTMLVideoElement;

  for (const record of records) {
    for (const element of Array.from(record.addedNodes)) {
      const id = (element as HTMLElement).id;
      if (id === ATTRIBUTE_NAME.VIDEO) video = element as HTMLVideoElement;
    }
  }

  return video;
};

/**
 * 講義動画がDOMに追加されたか検知する
 * @param callback 講義動画がDOMに追加された時に発火する
 */
export const useVideoLoaded = (callback: () => void) => {
  const detectVideoMount = new MutationObserver(records => {
    const video = getVideo(records);
    if (!video) return;
    callback();
  });
  useEffect(() => detectVideoMount.observe(document, OBSERVER_CONFIG), []);
};
