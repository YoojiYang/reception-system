import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

export type RoomType = {
  id: number;
  name: string;
  company?: string;
  scheduledArrival?: Date;
  reserveAdultsCount: number;
  reserveChildrenCount: number;
  changedAdultsCount: number;
  changedChildrenCount: number;
  taxiReservation: needOrNotStatus;
};

export enum needOrNotStatus {
  Need = "必要",
  Not = "不要",
  Unconfirmed = "未確認",
};


export type ArrivalType = {
  id: number;
  roomId: number;
  adultsCount: number;
  childrenCount: number;
  arrivalTime: Date;
  room: RoomType;
};

export type RoomCardProps = {
  startRoomId: number;
  endRoomId: number;
};

export type InChargeType = {
  id: number;
  name: string;
};

export type GeneralTaxiType = {
  id: number;
  taxiId: number;
  section: number;
  column: number;
  index: number;
  taxi: TaxiType;
};

export type TaxiType = {
  id: number;
  peopleCount: number;
  carCount: number;
  reservationTime: Date | string;
  taxiCompany: string;
  isCompleted: boolean;
  isCancel: boolean;
};

export type VipTaxiType = {
  id: number;
  taxiId: number;
  roomId: number;
  taxi: TaxiType;
  room: RoomType;
};

export type ReserveListProps = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditReserveListProps = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AcceptProps = {
  setAccepting: React.Dispatch<React.SetStateAction<boolean>>;
  setArrivals: React.Dispatch<React.SetStateAction<ArrivalType[]>>;
  lastUpdated: number;
  setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
};

export type ReserveCountChangeProps = {
  setCountChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NotArrivedProps = {
  arrivalCounts: TotalCountsType;
};

export type TotalCountsType = {
  [roomId: number]: number;
};

export type CurrentCountProps = {
  currentRoom: RoomType | undefined;
  arrivalCounts: Record<number, { adultsTotal: number; childrenTotal: number; }>;
};

export type RoomsContextType = {
  rooms: RoomType[];
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>;
  lastUpdated: number;
  setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
};

export type RoomsProviderProps = {
  children: React.ReactNode;
};

export type ArrivalContextType = {
  arrivals: ArrivalType[];
  setArrivals: React.Dispatch<React.SetStateAction<ArrivalType[]>>;
  lastUpdated: number;
  setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
  arrivalCounts: Record<number, { adultsTotal: number; childrenTotal: number; }>;
};

export type ArrivalProviderProps = {
  children: React.ReactNode;
};

export type VipTaxiContextType = {
  vipTaxis: VipTaxiType[];
  setVipTaxis: React.Dispatch<React.SetStateAction<VipTaxiType[]>>;
  lastUpdated: number;
  setLastUpdated: React.Dispatch<React.SetStateAction<number>>;
};

export type VipTaxiProviderProps = {
  children: React.ReactNode;
};

export type EditArrivalInfoProps = {
  currentRoom: RoomType;
  closeModal: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditReserveCountProps = {
  currentRoom: RoomType;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type GeneralTaxiProps = {
  generalTaxis: GeneralTaxiType[];
  setGeneralTaxis: React.Dispatch<React.SetStateAction<GeneralTaxiType[]>>;
};

export type FormatedGeneralTaxiType = {
  [key: string]: GeneralTaxiType | undefined;
};

export type VipTaxiProps = {
  vipTaxis: VipTaxiType[];
  setVipTaxis: React.Dispatch<React.SetStateAction<VipTaxiType[]>>;
};

export type TaxiReservationProps = {
  operationType: "create" | "update";
  onSubmit: (
    section: number,
    column: number,
    index: number,
    peopleCount: number,
    carCount: number,
    ) => void;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setGeneralTaxis: React.Dispatch<React.SetStateAction<GeneralTaxiType[]>>;
  initialValues?: GeneralTaxiType| undefined;
};

export type VipTaxiReservationProps = {
  currentRoom: RoomType;
};

export type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export type GeneralTaxiData = {
  section: number;
  column: number;
  index: number;
  peopleCount: number;
  carCount: number;
  reservationTime: string;
}

export type HandleEditDataProps = {
  route: string;
  data: any;
  editingId?: number;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

export type ArrivalRecordCounts = {
  [key: number]: number;
};

export type RoomsInfoProps = {
  totalReserveCount: number;
  currentCount: number;
  arrivalRecordCounts: Record<number, number>;
  room: RoomType;
};

export type TaxiInfo = {
  id: number;
}

export type ReserveTaxiListType = {
  id: number;
  name: string;
  carCount: number;
  peopleCount: number;
  reservationTime: string | Date;
  isCompleted: boolean;
  isCancel: boolean;
  taxiCompany: string | null;
  route: string;
  [key: string]: any;
};

export type CompleteListProps = {
  title: string;
  filterLogic: (taxi: ReserveTaxiListType) => boolean;
  reserveTaxiList: ReserveTaxiListType[];
  handleOnSubmit: (target: string, taxi: ReserveTaxiListType) => void;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
};

export type NotCompleteListProps = {
  setReserveTaxiList: React.Dispatch<React.SetStateAction<ReserveTaxiListType[]>>;
  filterLogic: (taxi: ReserveTaxiListType) => boolean;
  reserveTaxiList: ReserveTaxiListType[];
  handleOnSubmit: (target: string, taxi: ReserveTaxiListType) => void;
  editIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
  cancelIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
};