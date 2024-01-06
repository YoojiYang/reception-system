// import { TaxiType, ReserveTaxiListType } from "../../../../../types/types";

// // // gerMargeTaxiListで使用
// // const formatGeneralTaxi = (item: GeneralTaxiType) => ({
// //   id: item.taxiId,
// //   name: `T${ item.id >= 3 ? item.id + 1 : item.id }`,
// //   carCount: item.taxi.carCount,
// //   peopleCount: item.taxi.peopleCount,
// //   reservationTime: item.taxi.reservationTime,
// //   isCompleted: item.taxi.isCompleted,
// //   isCancel: item.taxi.isCancel,
// //   taxiCompany: item.taxi.taxiCompany,
// //   route: "generaltaxi",
// // });

// // // gerMargeTaxiListで使用
// // const formatVipTaxi = (item: VipTaxiType) => ({
// //   id: item.taxiId,
// //   name:item.room.name,
// //   carCount:item.taxi.carCount,
// //   peopleCount:item.taxi.peopleCount,
// //   reservationTime:item.taxi.reservationTime,
// //   isCompleted:item.taxi.isCompleted,
// //   isCancel:item.taxi.isCancel,
// //   taxiCompany: item.taxi.taxiCompany,
// //   route: "viptaxi",

// // });

// // // getReserveTaxiListで使用
// // // 一般タクシーとvipタクシーを結合
// // const getMargeTaxiList = (generalTaxis: GeneralTaxiType[], vipTaxis: VipTaxiType[]) => {
// //   const margeTaxiList = [
// //     ...generalTaxis.map(formatGeneralTaxi),
// //     ...vipTaxis.map(formatVipTaxi),
// //   ];

// //   return margeTaxiList;
// // }

// // getRiserveTaxiListで使用
// const getExpandedTaxiList = (margeTaxiList: ReserveTaxiListType[]) => {
//   let uniqueId = margeTaxiList.length + 1;

//   // carCountの数だけ要素を複製
//   const expandedList = margeTaxiList.flatMap(item => {
//     return Array(item.carCount).fill(null).map(() => {
//       const newObj = { ...item, originalId: item.id, id: uniqueId++ };
//       return newObj;
//     });
//   });

//   return expandedList;
// }

// // getReserveTaxiListで使用
// const getSortedReserveTaxiList = (expandedTaxiList: ReserveTaxiListType[]) => {
//   const sortedReserveTaxiList = expandedTaxiList.sort((a, b) => {
//     // Date型の場合
//     if (a.reservationTime instanceof Date && b.reservationTime instanceof Date) {
//       return a.reservationTime.getTime() - b.reservationTime.getTime();
//     }
//     // aがDate型、bがString型の場合
//     if (a.reservationTime instanceof Date) {
//       return -1;
//     }
//     // aがString型、bがDate型の場合
//     if (b.reservationTime instanceof Date) {
//       return 1;
//     }
//     // 両方ともString型の場合
//     return a.reservationTime.localeCompare(b.reservationTime);
//   });

//   return sortedReserveTaxiList;
// }
