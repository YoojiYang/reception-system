'use client';

import { useEffect, useState } from "react";
import { GeneralTaxiType, ReserveTaxiListType, VipTaxiType } from "../../../../types/types";
import Sidebar from "@/app/utils/components/Sidebar";
import { bgGrayCSS, pageTitleCSS } from "@/app/utils/style";
import { useVipTaxi } from "@/app/VipTaxiContext";
import { fetchGeneralTaxis, updateTaxi } from "@/app/utils/utils";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getReserveTaxiList, updateTaxiList } from "./components/utils";
import CompleteList from "./components/CompleteList";
import Header from "./components/Header";
import NotCompleteList from "./components/NotCompleteList";


const TaxiUsageInfo = () => {
  const { vipTaxis, setVipTaxis } = useVipTaxi();
  const [generalTaxis, setGeneralTaxis] = useState<GeneralTaxiType[]>([]);
  const [reserveTaxiList, setReserveTaxiList] = useState<ReserveTaxiListType[]>([]);

  const handleOnSubmit = async (target: string, taxi: ReserveTaxiListType) => {
    const currentValue = taxi[target as keyof ReserveTaxiListType];
    const updatedValue = {
      [target]: !currentValue,
    }

    const index = reserveTaxiList.findIndex(target => target.id === taxi.id);
    if (index !== -1) {
      const updatedTaxi = { ...reserveTaxiList[index], ...updatedValue };

      const updatedTaxiList = [
        ...reserveTaxiList.slice(0, index),
        updatedTaxi,
        ...reserveTaxiList.slice(index + 1),
      ];

      setReserveTaxiList(updatedTaxiList);
    }
    // const updatedTaxi = await updateTaxi(taxi.route, data, taxi.id);

    // updateTaxiList(taxi, updatedTaxi, setReserveTaxiList);
  }

  useEffect(() => {
    const fetchData = async () => {
      const generalTaxiData = await fetchGeneralTaxis();
      setGeneralTaxis(generalTaxiData);
      setVipTaxis(vipTaxis);
      setReserveTaxiList(getReserveTaxiList(generalTaxiData, vipTaxis));
    };
    
    fetchData();
  }, [vipTaxis]);

  return (
    <div className='mx-8'>
      <div className="m-8">
        <Sidebar />
      </div>
      <div>
        <h1 className={ pageTitleCSS }>タクシー案内</h1>
      </div>
      <div className={`${bgGrayCSS} mt-8`}>
        <Header reserveTaxiList={ reserveTaxiList }/>
        <NotCompleteList
          setReserveTaxiList={ setReserveTaxiList }
          filterLogic={ taxi => taxi.isCompleted === false && taxi.isCancel === false}
          reserveTaxiList={ reserveTaxiList }
          handleOnSubmit={ handleOnSubmit }
          editIcon={ CheckCircleOutlineIcon }
          cancelIcon={ CancelIcon }
        />
      </div>
      <CompleteList
        title="完了リスト"
        filterLogic={ taxi => taxi.isCompleted === true }
        reserveTaxiList={ reserveTaxiList }
        handleOnSubmit={ handleOnSubmit }
        icon={ CheckCircleIcon }
      />
      <CompleteList
        title="キャンセルリスト"
        filterLogic={ taxi => taxi.isCancel === true }
        reserveTaxiList={ reserveTaxiList }
        handleOnSubmit={ handleOnSubmit }
        icon={ CancelIcon }
      />
    </div>
  )
};

export default TaxiUsageInfo