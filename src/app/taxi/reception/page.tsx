'use client';

import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import GeneralTaxi from "./components/GeneralTaxi";
import CustomButton from "@/app/utils/components/CustomButton";
import VipTaxi from "./components/VipTaxi";
import { GeneralTaxiData, GeneralTaxiType, VipTaxiType } from "../../../../types/types";
import Modal from "@/app/utils/components/Modal";
import TaxiReservation from "./components/TaxiReservation";
import { fetchAllData, postGeneralTaxi } from "@/app/utils/utils";


function TaxiReception() {
  const [generalTaxis, setGeneralTaxis] = useState<GeneralTaxiType[]>([]);
  const [vipTaxis, setVipTaxis] = useState<VipTaxiType[]>([]);

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 text-4xl'>タクシー受付</h1>
      </div>
      <GeneralTaxi generalTaxis={ generalTaxis } setGeneralTaxis={ setGeneralTaxis } />
      <VipTaxi vipTaxis={ vipTaxis } setVipTaxis={ setVipTaxis } />
    </div>
  )
};

export default TaxiReception