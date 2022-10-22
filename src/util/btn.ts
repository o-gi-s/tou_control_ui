import $ from "jquery";
import { openPartAsync, getNextPart, getPrevPart } from "./part";

interface BtnProps {
  isExistActiveBtn: boolean;
  lectureContainer: JQuery<HTMLElement>;
}

/**
 * 次のボタン（第 ~ 回）取得
 * @returns
 */
export const getNextLectureBtn = ({
  isExistActiveBtn,
  lectureContainer
}: BtnProps) => async () => {
  let $btn: JQuery<HTMLElement>;

  if (isExistActiveBtn) {
    $btn = lectureContainer.next().find("a.lecture");
    $btn = $btn[0] ? $btn : await openPartAsync(getNextPart);
  } else {
    $btn = $("a.lecture");
  }

  return $btn;
};

/**
 * 前のボタン（第 ~ 回）取得
 * @returns
 */
export const getPrevLectureBtn = ({
  isExistActiveBtn,
  lectureContainer
}: BtnProps) => async () => {
  let $btn: JQuery<HTMLElement>;

  if (isExistActiveBtn) {
    $btn = lectureContainer.prev().find("a.lecture");
    $btn = $btn[0] ? $btn : await openPartAsync(getPrevPart);
  } else {
    $btn = await openPartAsync(getPrevPart);
  }

  return $btn.last();
};

/**
 * 取得したボタンをクリックする
 */
export const clickLectureBtn = async (
  getButton: (props: BtnProps) => () => Promise<JQuery<HTMLElement>>
) => {
  const $activeLecture = $("a.active-lecture");
  const isExistActiveBtn = !!$activeLecture[0];
  const lectureContainer = $activeLecture.parents("li.lecture-container");

  (await getButton({ isExistActiveBtn, lectureContainer })())[0].click();
};
