import { RoomType } from "../../../types/types";
import { createOptionsArray } from "./utils";

export const sectionOptions = createOptionsArray(122, 128);
export const columnOptions = createOptionsArray(1, 11);
export const indexOptions = createOptionsArray(1, 20);

export const taxiCompanyOptions = [
  { value: "NULL", label: "" },
  { value: "金星", label: "金星" },
  { value: "つばめ", label: "つばめ" },
  { value: "ウイング", label: "ウイング" },
  { value: "第一交通", label: "第一交通" },
  { value: "リスコ", label: "リスコ" },
  { value: "MK", label: "MK" },
  { value: "三和交通", label: "三和交通" },
];

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

export const roomNameOptions = (rooms: RoomType[]) => {
  const sortedRooms = [...rooms].sort((a: RoomType, b: RoomType) => a.id - b.id);
  return sortedRooms.map((room) => ({
      value: room.id,
      label: room.name,
    }));
};



export const deMKSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 100,
    minHeight: 50,
    width: 400,
    cursor: 'pointer',
    borderRadius: '12px',
  }),
};

export const inChargeTaxiSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 60,
    minHeight: 50,
    width: 100,
    cursor: 'pointer',
    borderRadius: '12px',
  }),
};


export const inChargeTaxiStringSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 60,
    minHeight: 50,
    width: 240,
    cursor: 'pointer',
    borderRadius: '12px',
  }),
};

export const inChargeTaxiEditSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 60,
    minHeight: 50,
    width: 240,
    cursor: 'pointer',
    borderRadius: '12px',
  }),
};


export const taxiReceptoinSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 80,
    minHeight: 50,
    width: 100,
    cursor: 'pointer',
    borderRadius: '12px',
  }),
};

export const taxiReceptoinLargeSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    height: 80,
    minHeight: 50,
    width: 240,
    cursor: 'pointer',
    borderRadius: '12px',
  }),
};