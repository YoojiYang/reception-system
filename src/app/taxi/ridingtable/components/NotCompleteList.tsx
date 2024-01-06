import { recordFontCSS } from "@/app/utils/style"
import { NotCompleteListProps, TaxiType } from "../../../../../types/types"
import CustomIconButton from "@/app/utils/components/CustomIcomButton"
import { formatTime, updateData } from "@/app/utils/utils"
import CustomStringSelect from "@/app/utils/components/CustomStringSelect"
import { taxiCompanyOptions } from "@/app/utils/selectOptions"
import { useTaxis } from "@/app/context/TaxiContext"

const NotCompleteList = ({ handleOnSubmit, editIcon: EditIconComponent, cancelIcon: CancelIconComponent }: NotCompleteListProps) => {
  const { taxis, setTaxis } = useTaxis();

  const handleTaxiCompanySelect = async (value: string, taxi: TaxiType) => {
    const data = {
      taxiCompany: value,
    }
    console.log("taxi", taxi);
    const updatedTaxi = await updateData("taxi", data, taxi.id);
    console.log(updatedTaxi);

    if (updatedTaxi) {
      setTaxis(prevTaxis => prevTaxis.map(t => {
        if (t.id === updatedTaxi.id) {
          return { ...t, ...updatedTaxi, room: t.room };
        }
        return t;
      }));
    }
  }

  return (
    <div>
      {taxis
      .filter((taxi: TaxiType) => !taxi.isCompleted && !taxi.isCancel)
      .map((taxi: TaxiType) => (
        <div 
        key={ taxi.id }
        className='h-12 w-full m-4 grid grid-cols-7 gap-2 items-center'
        >
          <p className={ `${recordFontCSS} h-full py-2 bg-white rounded-xl` }>
            { taxi.isGeneralTaxi ? "T" + taxi.generalTaxiId : taxi.room?.name }
          </p>
          <p className={ `${recordFontCSS} h-full py-2 bg-white rounded-xl` }>
            { taxi.afterEvent ? "試合終了後" : formatTime(taxi.reservationTime) }
          </p>
          {/* TODO: 担当者を動的に変更する */}
          <p className={ `${recordFontCSS} col-span-2 h-full py-2 bg-white rounded-xl` }>担当者,</p>
          <CustomStringSelect
            options={ taxiCompanyOptions }
            name="taxiCompany"
            value={ taxi.taxiCompany ? taxi.taxiCompany : "" }
            onChange={ (value: string) => handleTaxiCompanySelect(value, taxi) }
            className={ "p-2 col-span-2 bg-white rounded-xl" }
          />
          <div className="flex justify-center items-center space-x-2">
            <CustomIconButton
              onClick={ () => handleOnSubmit("isCompleted", taxi) }
              className="bg-blue-500 hover:bg-blue-700 "
              >
              <EditIconComponent />
            </CustomIconButton>
            <CustomIconButton
              onClick={ () => handleOnSubmit("isCancel", taxi) }
              className=" bg-blue-500 hover:bg-blue-700"
            >
              <CancelIconComponent />
            </CustomIconButton>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotCompleteList