'use client';

import { useEffect } from "react";
import { TaxiType } from "../../../../types/types";
import Sidebar from "@/app/utils/components/Sidebar";
import { bgGrayCSS, pageTitleCSS } from "@/app/utils/style";
import { fetchTaxis, useTaxis } from "@/app/context/TaxiContext";
import { updateData } from "@/app/utils/utils";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Header from "./components/Header";
import NotCompleteList from "./components/NotCompleteList";
import CompleteList from "./components/CompleteList";


const TaxiUsageInfo = () => {
  const { taxis, setTaxis } = useTaxis();

  const handleOnSubmit = async (targetFlag: string, taxi: TaxiType) => {
    const currentValue = taxi[targetFlag as keyof TaxiType];
    const updatedValue = {
      [targetFlag]: !currentValue,
    }

    const index = taxis.findIndex(t => t.id === taxi.id);
    if (index !== -1) {
      const updatedTaxi = { ...taxis[index], ...updatedValue };

      const updatedTaxiList = [
        ...taxis.slice(0, index),
        updatedTaxi,
        ...taxis.slice(index + 1),
      ];

      const data = {
        [targetFlag]: updatedTaxi[targetFlag as keyof TaxiType]
      }

      await updateData("taxi", data, updatedTaxi.id); 
      setTaxis(updatedTaxiList);
    } 
  }

  useEffect(() => {
    fetchTaxis(setTaxis);
  }, [setTaxis]);


  return (
    <div className='mx-8'>
      <div className="m-8">
        <Sidebar />
      </div>
      <div>
        <h1 className={ pageTitleCSS }>タクシー案内</h1>
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <Header />
        <NotCompleteList
          handleOnSubmit={ handleOnSubmit }
          editIcon={ CheckCircleOutlineIcon }
          cancelIcon={ CancelIcon }
        />
      </div>
      <CompleteList
        title="完了リスト"
        filterLogic={ taxi => taxi.isCompleted === true }
        handleOnSubmit={ handleOnSubmit }
        onClickTarget="isCompleted"
        icon={ CheckCircleIcon }
      />
      <CompleteList
        title="キャンセルリスト"
        filterLogic={ taxi => taxi.isCancel === true }
        handleOnSubmit={ handleOnSubmit }
        onClickTarget="isCancel"
        icon={ CancelIcon }
      />
    </div>
  )
};

export default TaxiUsageInfo