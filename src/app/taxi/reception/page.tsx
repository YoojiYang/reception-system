'use client';

import GeneralTaxi from "./components/GeneralTaxi";
import VipTaxi from "./components/VipTaxi";
import Sidebar from "@/app/utils/components/Sidebar";
import { bgGrayCSS, pageTitleCSS } from "@/app/utils/style";

function TaxiReception() {

  return (
    <div className='mx-8'>
      <div className="m-8">
        <Sidebar />
      </div>
      <div>
        <h1 className={ pageTitleCSS }>タクシー受付</h1>
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <GeneralTaxi />
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <VipTaxi />
      </div>
    </div>
  )
};

export default TaxiReception