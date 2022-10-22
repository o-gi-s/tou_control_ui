import $ from "jquery";
import { OBSERVER_CONFIG } from "../constant/observerConfig";

export type PartElement = JQuery<HTMLElement>;
export type GetSectionContainer = () => PartElement;
export type GetPart = (
  getSectionContainer: GetSectionContainer
) => () => PartElement;

/**
 * 現在のアクティブなセクションを所得
 * @returns
 */
const getSectionContainer: GetSectionContainer = (): PartElement => {
  return $(".active-section").parents("li.section-container");
};

/**
 * 次の回を取得
 */
export const getNextPart: GetPart = (
  getSectionContainer: GetSectionContainer
) => (): PartElement => getSectionContainer().next();

/**
 * 前の回を取得
 */
export const getPrevPart: GetPart = (
  getSectionContainer: GetSectionContainer
) => (): PartElement => getSectionContainer().prev();

/**
 * 新規に回を開く
 * @param getPart
 * @returns
 */
export const openPartAsync = async (
  getPart: (getSectionContainer: GetSectionContainer) => () => PartElement
) => {
  // DOM検知に邪魔なので消す
  // アンマウントされるボタンなのか新しくマウントされたボタンなのか
  // 見分けがつかないため
  $("a.lecture").remove();

  getPart(getSectionContainer)()
    .find(".section-title")[0]
    .click();

  return new Promise<JQuery<HTMLElement>>(resolve => {
    new MutationObserver(() => {
      const $nextBtn = $("a.lecture");
      if (!$nextBtn[0]) return;
      resolve($nextBtn);
    }).observe(document, OBSERVER_CONFIG);
  });
};
