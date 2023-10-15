'use client';

import { useState } from "react";
import GeneralTaxi from "./components/GeneralTaxi";
import VipTaxi from "./components/VipTaxi";
import { GeneralTaxiType, VipTaxiType } from "../../../../types/types";

function TaxiReception() {
  const [generalTaxis, setGeneralTaxis] = useState<GeneralTaxiType[]>([]);

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 text-4xl'>タクシー受付</h1>
      </div>
      <GeneralTaxi generalTaxis={ generalTaxis } setGeneralTaxis={ setGeneralTaxis } />
      <VipTaxi />
    </div>
  )
};

export default TaxiReception