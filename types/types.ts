import React from "react";

export type RoomType = {
  id: number;
  name: string;
  company: string;
  scheduledArrival: Date;
  reserveAdultsCount: number;
  reserveChildrenCount: number;
  changedAdultsCount: number;
  changedChildrenCount: number;
};

export type ArrivalType = {
  id: number;
  roomId: number;
  adultsCount: number;
  childrenCount: number;
  arrivalTime: Date;
  room: RoomType;
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
  taxi?: TaxiType;
};

export type TaxiType = {
  id: number;
  peopleCount: number;
  carCount: number;
  reservationTime: Date | string | null;
  taxiCompany: string | null;
  isCompleted: boolean;
  isCancel: boolean;
};

export type VipTaxiType = {
  id: number;
  NeedOrNot: string;
  taxiId: number;
  roomId: number;
  taxi?: TaxiType;
  room?: RoomType;
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
};

export type ReserveCountChangeProps = {
  setCountChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NotArrivedProps = {
  rooms: RoomType[];
  roomArrivalCounts: Record<number, number>;
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
};

export type ArrivalProviderProps = {
  children: React.ReactNode;
};

export type EditArrivalInfoProps = {
  currentRoom: RoomType;
  closeModal: () => void;
  arrivalCounts: Record<number, { adultsTotal: number; childrenTotal: number; }>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditReserveCountProps = {
  currentRoom: RoomType;
  closeModal: () => void;
  arrivalCounts: Record<number, { adultsTotal: number; childrenTotal: number; }>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type GeneralTaxiProps = {
  generalTaxis: GeneralTaxiType[];
  setGeneralTaxis: React.Dispatch<React.SetStateAction<GeneralTaxiType[]>>;
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
  initialValues?: GeneralTaxiData;
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
}
