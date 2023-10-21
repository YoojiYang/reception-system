import { GeneralTaxiType, ReserveTaxiListType, VipTaxiType } from "../../../../../types/types";

const formatGeneralTaxi = (item: GeneralTaxiType) => ({
  id: item.id,
  name: `T${ item.id >= 3 ? item.id + 1 : item.id }`,
  carCount: item.taxi.carCount,
  peopleCount: item.taxi.peopleCount,
  reservationTime: item.taxi.reservationTime,
  isCompleted: item.taxi.isCompleted,
  isCancel: item.taxi.isCancel,
  taxiCompany: item.taxi.taxiCompany,
  route: "generaltaxi",
});

const formatVipTaxi = (item: VipTaxiType) => ({
  id: item.id,
  name:item.room.name,
  carCount:item.taxi.carCount,
  peopleCount:item.taxi.peopleCount,
  reservationTime:item.taxi.reservationTime,
  isCompleted:item.taxi.isCompleted,
  isCancel:item.taxi.isCancel,
  taxiCompany: item.taxi.taxiCompany,
  route: "viptaxi",
});

// 一般タクシーとvipタクシーを結合
const getMargeTaxiList = (generalTaxis: GeneralTaxiType[], vipTaxis: VipTaxiType[]) => {
  const margeTaxiList = [
    ...generalTaxis.map(formatGeneralTaxi),
    ...vipTaxis.map(formatVipTaxi),
  ];

  return margeTaxiList;
}

const getExpandedTaxiList = (margeTaxiList: ReserveTaxiListType[]) => {
  let uniqueId = margeTaxiList.length + 1;

  // carCountの数だけ要素を複製
  const expandedList = margeTaxiList.flatMap(item => {
    return Array(item.carCount).fill(null).map(() => {
      const newObj = { ...item, originalId: item.id, id: uniqueId++ };
      return newObj;
    });
  });

  return expandedList;
}

const getSortedReserveTaxiList = (expandedTaxiList: ReserveTaxiListType[]) => {
  const sortedReserveTaxiList = expandedTaxiList.sort((a, b) => {
    // Date型の場合
    if (a.reservationTime instanceof Date && b.reservationTime instanceof Date) {
      return a.reservationTime.getTime() - b.reservationTime.getTime();
    }
    // aがDate型、bがString型の場合
    if (a.reservationTime instanceof Date) {
      return -1;
    }
    // aがString型、bがDate型の場合
    if (b.reservationTime instanceof Date) {
      return 1;
    }
    // 両方ともString型の場合
    return a.reservationTime.localeCompare(b.reservationTime);
  });

  return sortedReserveTaxiList;
}

export const getReserveTaxiList = (generalTaxis: GeneralTaxiType[], vipTaxis: VipTaxiType[]) => {
  // 一般タクシーとvipタクシーを結合
  const margeTaxiList = getMargeTaxiList(generalTaxis, vipTaxis);
  // carCountの数だけ要素を複製
  const expandedTaxiList = getExpandedTaxiList(margeTaxiList);
  // 予約時間でソートし、idをkeyとしたオブジェクトに変換
  const sortedReserveTaxiList = getSortedReserveTaxiList(expandedTaxiList);
  
  return sortedReserveTaxiList;
}


export const updateTaxiList = (taxi: ReserveTaxiListType, updatedTaxi: any, setReserveTaxiList: any) => {
  if (taxi.route === "generaltaxi") {
    const formatGeneralTaxiData = formatGeneralTaxi(updatedTaxi);
    setReserveTaxiList((prevTaxis: GeneralTaxiType[]) =>
      prevTaxis.map(item => item.id === taxi.id ? formatGeneralTaxiData : item)
    );
  } else if (taxi.route === "viptaxi") {
    const formatVipTaxiData = formatVipTaxi(updatedTaxi);
    setReserveTaxiList((prevTaxis: VipTaxiType[]) => 
      prevTaxis.map(item => item.id === taxi.id ? formatVipTaxiData : item)
    );
  }
}
