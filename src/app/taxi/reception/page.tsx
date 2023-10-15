'use client';

import { useState } from "react";
import GeneralTaxi from "./components/GeneralTaxi";
import VipTaxi from "./components/VipTaxi";
import { GeneralTaxiType, VipTaxiType } from "../../../../types/types";
import Sidebar from "@/app/utils/components/Sidebar";
import { bgGrayCSS, pageTitleCSS } from "@/app/utils/style";

function TaxiReception() {
  const [generalTaxis, setGeneralTaxis] = useState<GeneralTaxiType[]>([]);

  return (
    <div className='mx-8'>
      <div className="m-8">
        <Sidebar />
      </div>
      <div>
        <h1 className={ pageTitleCSS }>タクシー受付</h1>
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <GeneralTaxi generalTaxis={ generalTaxis } setGeneralTaxis={ setGeneralTaxis } />
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <VipTaxi />
      </div>
    </div>
  )
};

export default TaxiReception