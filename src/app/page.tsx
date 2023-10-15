'use client'

import React, { Dispatch, SetStateAction, useState } from "react";
import Sidebar from "./utils/components/Sidebar";
import Arrival from "./arrival/page";

export default function Home() {


  return (
    <div>
      <div className="flex">
        <div className="w-60">
          <Sidebar alwaysOpen={ true } />
        </div>
        <Arrival />
      </div>
    </div>
  )


}
