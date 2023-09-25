// 'use client';

// import { useEffect, useState } from "react"
// import { RoomType } from "../types";
// import { fetchAllArrivals, fetchAllRooms, fetchArrivalsForRoom, postArrival } from "../utils/utils";
// import CurrentCount from "./components/CurrentCount";
// import { TotalGuests } from "./components/TotalGuests";
// import AllInOut from "./components/AllInOut";

function InCharge() {
//   const [rooms, setRooms] = useState<RoomType[]>([]);
//   const [localAdultsCount, setLocalAdultsCount] = useState<number>(0);
//   const [localChildrenCount, setLocalChildrenCount] = useState<number>(0);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
//   const [roomArrivalData, setRoomArrivalData] = useState<Record<number, { adultsTotal: number, childrenTotal: number }>>({});



//   const handleRoomClick = (roomId: number) => {
//     setCurrentRoomId(roomId);
//     setIsModalOpen(true);

//   };

//   const currentRoom = rooms.find(room => room.id === currentRoomId);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentRoomId(null);
//   }

//   useEffect(() => {
//     async function loadRooms() {
//       try {
//         const fetchedRooms = await fetchAllRooms();
//         setRooms(fetchedRooms);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     loadRooms();
//   }, []);

  // useEffect(() => {
  //   async function fetchArrivalData() {
  //     const data = await fetchAllArrivals(); // この関数は適切に実装する必要があります
  //     const result: Record<number, { adultsTotal: number, childrenTotal: number }> = {};
  
  //     for (const arrival of data) {
  //       if (!result[arrival.roomId]) {
  //         result[arrival.roomId] = { adultsTotal: 0, childrenTotal: 0 };
  //       }
  //       result[arrival.roomId].adultsTotal += arrival.adultsCount;
  //       result[arrival.roomId].childrenTotal += arrival.childrenCount;
  //     }
  
  //     setRoomArrivalData(result);
  //   }
  
  //   fetchArrivalData();
  // }, []);

    
  return (
    <div>inCharge</div>
    // <div className='mx-8'>
    //   <div>
    //     <h1 className='mt-8 text-4xl'>個室担当用</h1>
    //   </div>
    //   <div className="grid grid-cols-2">
    //     <div>
    //       <div className="flex flex-col">
    //         {rooms
    //           .filter(room => room.id <= 114)
    //           .sort((a, b) => a.id - b.id)
    //           .map(room => (
    //             <button 
    //               key={ room.id } 
    //               onClick={() => { handleRoomClick(room.id) }}
    //               className="mt-4 h-12 text-2xl"
    //             >
    //               { room.name }
    //             </button>
    //         ))}
    //       </div>
    //     </div>
    //     <div>
    //       <div className="flex flex-col">
    //         {rooms
    //           .filter(room => room.id >= 201)
    //           .sort((a, b) => a.id - b.id)
    //           .map(room => (
    //             <button 
    //               key={ room.id } 
    //               onClick={() => { handleRoomClick(room.id) }}
    //               className="mt-4 h-12 text-2xl"
    //             >
    //               { room.name }
    //             </button>
    //         ))}
    //       </div>

    //     </div>
    //   </div>

    //   { isModalOpen && (
    //     <div className="fixed top-0 left-0 w-full h-full bg-gray-500/50 flex items-center justify-center z-10">
    //       <div className="bg-white p-5 m-3 h-4/5 rounded-md w-4/5 overflow-y-auto">
    //         <div className="m-12 items-center">
    //           <div className="flex w-full h-24">
    //             <h3 className="w-1/8">＜</h3>
    //             <div className="w-3/4">
    //               <h2 className="text-center text-3xl">{ currentRoom?.name }</h2>
    //               <h2 className="text-center text-3xl">{ currentRoom?.company }</h2>
    //             </div>
    //             <h3 className="w-1/8">＞</h3>
    //             <button onClick={ closeModal }>閉じる</button>
    //           </div>
    //           {/* ここに編集フォームを追加 */}
    //           <div className="ml-16 mr-16">
    //             <form>
    //               <div className="flex justify-between">
    //                 <h3 className="text-3xl">[ 到着情報 ]</h3>
    //                 <button 
    //                   onClick={() => {  }}
    //                   className='w-24 py-4 mr-8 rounded-md shadow-md bg-[#fb923c] text-xl'
    //                 >
    //                   登録
    //                 </button>
    //               </div>
    //               <div className="flex h-60 mt-8">
    //                 <div className="w-1/2">
    //                   <CurrentCount currentRoom={ currentRoom } roomArrivalData={ roomArrivalData } />
    //                 </div>
    //                 <div className="w-1/2">
    //                   <TotalGuests currentRoom={ currentRoom } roomArrivalData={ roomArrivalData } />
    //                 </div>
    //               </div>
    //               <AllInOut />
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}


export default InCharge