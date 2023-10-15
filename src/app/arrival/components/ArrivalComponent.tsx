'use client';

import Arrived from "./Arrived";
import { bgGrayCSS, pageTitleCSS } from "@/app/utils/style";

function ArrivalComponent() {

  return (
    <div className="mx-8">
      <div>
        <h1 className={ pageTitleCSS }>来場状況</h1>
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <Arrived />
      </div>
    </div>
  )
}

export default ArrivalComponent;