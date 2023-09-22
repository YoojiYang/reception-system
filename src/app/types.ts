export type RoomType = {
  id: number;
  name: string;
  company: string;
  scheduledArrival: Date;
  reserveAdultsCount: number;
  reserveChildrenCount: number;
};

export type ArrivalType = {
  id: number;
  adultsCount: number;
  childrenCount: number;
  changedAdultsCount: number;
  changedChildrenCount: number;
  arrivalTime: Date;
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