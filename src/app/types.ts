import { Room } from "@prisma/client";
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
  adultsCount: number;
  childrenCount: number;
  arrivalTime: Date;
  room: RoomType;
};

export type InChargeType = {
  id: number;
  name: string;
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

export type NotArrivedProps = {
  rooms: RoomType[];
  roomArrivalCounts: Record<number, number>;
};

export type CurrentCountProps = {
  currentRoom: RoomType | undefined;
  roomArrivalData: Record<number, { adultsTotal: number; childrenTotal: number; }>;
};