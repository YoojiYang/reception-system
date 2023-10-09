import { createOptionsArray } from "./utils";

export const sectionOptions = createOptionsArray(122, 128);
export const columnOptions = createOptionsArray(1, 11);
export const indexOptions = createOptionsArray(1, 20);


export const needOrNotOptions = [
  { value: "Need", label: "必要" },
  { value: "Not", label: "不要" },
  { value: "Unconfirmed", label: "未確認" },
];
export const peopleCountOptions = createOptionsArray(0, 4);
export const carCountOptions = createOptionsArray(0, 5);
export const reservationTimeOptions = [
  { value: "試合終了後", label: "試合終了後" },
];
