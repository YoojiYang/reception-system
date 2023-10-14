import { deleteGeneralTaxi, fetchGeneralTaxis, postGeneralTaxi, updateTaxi } from "@/app/utils/utils";
import { FormatedGeneralTaxiType, GeneralTaxiData, GeneralTaxiProps, GeneralTaxiType } from "../../../../../types/types";
import { useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import Modal from "@/app/utils/components/Modal";
import TaxiReservation from "./TaxiReservation";


const GeneralTaxi = ({ generalTaxis, setGeneralTaxis }: GeneralTaxiProps) => {
  const [isNewPost, setIsNewPost] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);

  
  
  const formatedGeneralTaxis= generalTaxis.reduce<FormatedGeneralTaxiType>((acc, item) => {
    acc[String(item.id)] = item;
    return acc;
  }, {});
  
  // const selectedTaxi = formatedGeneralTaxis[editingTaxiId];
  

  // if (selectedTaxiData && selectedTaxi.taxi) {
  //   selectedTaxiData = {
  //     section: selectedTaxi.section,
  //     column: selectedTaxi.column,
  //     index: selectedTaxi.index,
  //     peopleCount: selectedTaxi.taxi.peopleCount,
  //     carCount: selectedTaxi.taxi.carCount
  //   };
  // }

  console.log("formatedGeneralTaxis:", formatedGeneralTaxis);

  const totalCarCount = generalTaxis.reduce((acc: number, generalTaxi: GeneralTaxiType) => {
    return acc + (generalTaxi.taxi?.carCount || 0);
  }, 0);
  
  
  const handleDelete = async (taxiId: number) => {
    try {
      await deleteGeneralTaxi(taxiId);
      fetchGeneralTaxis(setGeneralTaxis);
    } catch (error) {
      console.error("Failed to delete taxi:", error);
    }
  };

  useEffect(() => {
    fetchGeneralTaxis(setGeneralTaxis);
  }, [setGeneralTaxis]);

  return (
    <div>
      <div>
        <div>
          <h2>一般タクシー</h2>
          <p>予約合計{ totalCarCount }</p>
          <div className='h-32 flex items-center justify-end space-x-8'>
            <CustomButton text={ "追加" } onClick={ () => { setIsNewPost(true) }} className={ "py-4 px-8 text-xl" } />
          </div>
        </div>
        <div className='h-8 mt-4 grid grid-cols-8 gap-2 items-center'>
          <p className='text-center h-full flex items-center justify-center'>タグ</p>
          <p className='text-center h-full flex items-center justify-center'>Sec.</p>
          <p className='text-center h-full flex items-center justify-center'>列</p>
          <p className='text-center h-full flex items-center justify-center'>番</p>
          <p className='text-center h-full flex items-center justify-center'>人数</p>
          <p className='text-center h-full flex items-center justify-center'>台数</p>
        </div>
      </div>
      <div>
        <div className=''>
          {generalTaxis
            .sort((a: GeneralTaxiType, b: GeneralTaxiType) => a.id - b.id)
            .map((taxi: GeneralTaxiType) => (
              <div
                  key={taxi.id}
                  className='h-12 mt-4 grid grid-cols-8 gap-2 items-center'
              >
                <p className='text-center h-full flex items-center justify-center'>T{ taxi.id >= 3 ? taxi.id + 1 : taxi.id }</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.section }</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.column }</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.index }</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.taxi?.peopleCount}</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.taxi?.carCount}</p>
                <CustomButton
                  text={ "編集" }
                  onClick={ () => {
                    setEditingTaxiId(taxi.id);
                    setIsEditing(true);
                  }}
                  className={ "py-2 px-2 text-lg" }
                />
                <CustomButton
                  text={ "削除" }
                  onClick={ () => handleDelete(taxi.id) }
                  className={ "py-2 px-2 text-lg"}
                />
              </div>
          ))}
        </div>
        { isNewPost && (
          <div>
            <Modal isVisible={ isNewPost } onClose={ () => setIsNewPost(false) }>
              <TaxiReservation
                operationType="create"
                onSubmit={ async ( section, column, index, peopleCount, carCount ) => {
                  const data: GeneralTaxiData = { section, column, index, peopleCount, carCount };
                  await postGeneralTaxi(data);
                  fetchGeneralTaxis(setGeneralTaxis);
                }}
                setEditing={ setIsNewPost }
                setGeneralTaxis={ setGeneralTaxis }
              />
            </Modal>
          </div>
        )}

        { isEditing && editingTaxiId && (
          <Modal isVisible={ isEditing } onClose={ () => setIsEditing(false) }>
            <TaxiReservation
              operationType="update"
              onSubmit={ async (section, column, index, peopleCount, carCount) => {
                const data = {
                  section: section,
                  column: column,
                  index: index,
                  peopleCount: peopleCount,
                  carCount: carCount,
                };
                await updateTaxi("generaltaxi", data, editingTaxiId);
                fetchGeneralTaxis(setGeneralTaxis);
              }}
              setEditing={ setIsEditing }
              setGeneralTaxis={ setGeneralTaxis }
              initialValues={ formatedGeneralTaxis[editingTaxiId] }
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default GeneralTaxi;