'use client';

import { useState } from "react";
import GeneralTaxi from "./components/GeneralTaxi";
import CustomButton from "@/app/utils/components/CustomButton";
import VipTaxi from "./components/VipTaxi";
import { GeneralTaxiData, GeneralTaxiType, VipTaxiType } from "../../../../types/types";
import Modal from "@/app/utils/components/Modal";
import TaxiReservation from "./components/TaxiReservation";
import { postGeneralTaxi } from "@/app/utils/utils";


function TaxiReception() {
  const [editing, setEditing] = useState<boolean>(false);
  const [generalTaxis, setGeneralTaxis] = useState<GeneralTaxiType[]>([]);
  const [vipTaxis, setVipTaxis] = useState<VipTaxiType[]>([]);

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 text-4xl'>タクシー受付</h1>
      </div>
      <div className='h-32 flex items-center justify-end space-x-8'>
        <CustomButton text={ "追加" } onClick={ () => { setEditing(true) }} className={ "py-4 px-8 text-xl" } />
      </div>
      <GeneralTaxi generalTaxis={ generalTaxis } setGeneralTaxis={ setGeneralTaxis } />
      <VipTaxi vipTaxis={ vipTaxis } setVipTaxis={ setVipTaxis } />
      { editing && (
        <div>
          <Modal isVisible={ editing } onClose={ () => setEditing(false) }>
            <TaxiReservation
              operationType="create"
              onSubmit={ async ( section, column, index, peopleCount, carCount ) => {
                const data: GeneralTaxiData = { section, column, index, peopleCount, carCount };
                await postGeneralTaxi(data);
              }}
              setEditing={ setEditing }
              setGeneralTaxis={ setGeneralTaxis }
            />
          </Modal>
        </div>
      )}
    </div>
  )
};

export default TaxiReception