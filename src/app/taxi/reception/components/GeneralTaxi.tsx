import { deleteGeneralTaxi, fetchGeneralTaxis, postData, updateTaxi } from "@/app/utils/utils";
import { FormatedGeneralTaxiType, GeneralTaxiData, GeneralTaxiProps, GeneralTaxiType } from "../../../../../types/types";
import { useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import Modal from "@/app/utils/components/Modal";
import TaxiReservation from "./TaxiReservation";
import { indexFontCSS, recordFontCSS } from "@/app/utils/style";


const GeneralTaxi = ({ generalTaxis, setGeneralTaxis }: GeneralTaxiProps) => {
  const [isNewPost, setIsNewPost] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);

  
  
  const formatedGeneralTaxis= generalTaxis.reduce<FormatedGeneralTaxiType>((acc, item) => {
    acc[String(item.id)] = item;
    return acc;
  }, {});
  
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
        <div className="flex justify-between">
          <div className="h-auto m-4 py-4 flex space-x-12 items-end">
            <h2 className="text-2xl font-bold">一般タクシー</h2>
            <p className="text-xl">
              予約合計
              <span className="mx-2 text-3xl font-bold">
                { totalCarCount }
              </span>
              台
            </p>
          </div>
          <div className=' flex items-center justify-center space-x-8'>
            <div>
              <CustomButton text={ "追加" } onClick={ () => { setIsNewPost(true) }} className={ "py-4 px-8 text-xl" } />
            </div>
        </div>
        </div>
        <div className='h-8 mt-4 grid grid-cols-8 gap-2 items-center'>
          <p className={ indexFontCSS }>タグ</p>
          <p className={ indexFontCSS }>Section</p>
          <p className={ indexFontCSS }>列</p>
          <p className={ indexFontCSS }>番</p>
          <p className={ indexFontCSS }>人数</p>
          <p className={ indexFontCSS }>台数</p>
        </div>
      </div>
      <div>
        <div className='h-full p-2 bg-white rounded-2xl'>
          {generalTaxis
            .sort((a: GeneralTaxiType, b: GeneralTaxiType) => a.id - b.id)
            .map((taxi: GeneralTaxiType) => (
              <div
                  key={taxi.id}
                  className='h-12 mt-4 grid grid-cols-8 gap-2 items-center'
              >
                <p className={ recordFontCSS }>T{ taxi.id >= 3 ? taxi.id + 1 : taxi.id }</p>
                <p className={ recordFontCSS }>{ taxi.section }</p>
                <p className={ recordFontCSS }>{ taxi.column }</p>
                <p className={ recordFontCSS }>{ taxi.index }</p>
                <p className={ recordFontCSS }>{ taxi.taxi?.peopleCount}</p>
                <p className={ recordFontCSS }>{ taxi.taxi?.carCount}</p>
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
                  const data: GeneralTaxiData = {
                    section: section,
                    column: column,
                    index: index,
                    peopleCount: peopleCount,
                    carCount: carCount,
                  };
                  await postData("generaltaxi", data);
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