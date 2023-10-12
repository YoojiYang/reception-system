import { deleteGeneralTaxi, fetchAllData, fetchAllGeneralTaxis, updateGeneralTaxi } from "@/app/utils/utils";
import { GeneralTaxiData, GeneralTaxiProps, GeneralTaxiType } from "../../../../../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import Modal from "@/app/utils/components/Modal";
import TaxiReservation from "./TaxiReservation";


const GeneralTaxi = ({ generalTaxis, setGeneralTaxis }: GeneralTaxiProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  
  const fetchGeneralTaxis = async (setGeneralTaxis: Dispatch<SetStateAction<GeneralTaxiType[]>>) => {
    try {
      const fetchedGeneraltaxis = await fetchAllData("generaltaxi");
      setGeneralTaxis(fetchedGeneraltaxis);
    } catch (error) {
      console.error(error);
    }
  };

  const getSelectedTaxiData = (id: number): GeneralTaxiData | undefined => {
    const taxi = generalTaxis.find(taxi => taxi.id === id);
    if (!taxi || !taxi.taxi) return;
  
    return {
      section: taxi.section,
      column: taxi.column,
      index: taxi.index,
      peopleCount: taxi.taxi.peopleCount,
      carCount: taxi.taxi.carCount
    };
  };
  
  const selectedTaxiData = editingTaxiId ? getSelectedTaxiData(editingTaxiId) : undefined;
  
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
                    setIsModalOpen(true);
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
        { isModalOpen && editingTaxiId && (
          <Modal isVisible={ isModalOpen } onClose={ () => setIsModalOpen(false) }>
            <TaxiReservation
              operationType="update"
              onSubmit={ async (section, column, index, peopleCount, carCount) => {
                const data: GeneralTaxiData = { section, column, index, peopleCount, carCount };
                await updateGeneralTaxi(data, editingTaxiId);
              }}
              setEditing={ setIsModalOpen }
              setGeneralTaxis={ setGeneralTaxis }
              initialValues={ selectedTaxiData }
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default GeneralTaxi;