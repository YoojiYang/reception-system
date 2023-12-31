import { recordFontCSS } from "@/app/utils/style"
import { NotCompleteListProps, ReserveTaxiListType } from "../../../../../types/types"
import CustomIconButton from "@/app/utils/components/CustomIcomButton"
import { formatTime, updateTaxi } from "@/app/utils/utils"
import CustomStringSelect from "@/app/utils/components/CustomStringSelect"
import { taxiCompanyOptions } from "@/app/utils/selectOptions"
import { updateTaxiList } from "./utils"

const NotCompleteList = ({ setReserveTaxiList, filterLogic, reserveTaxiList, handleOnSubmit, editIcon: EditIconComponent, cancelIcon: CancelIconComponent }: NotCompleteListProps) => {

  const handleTaxiCompanySelect = async (value: string, taxi: ReserveTaxiListType) => {
    const data = {
      taxiCompany: value,
    }
    const updatedTaxi = await updateTaxi(taxi.route, data, taxi.id);

    updateTaxiList(taxi, updatedTaxi, setReserveTaxiList);
  }

  return (
    <div>
      {reserveTaxiList
      .filter(filterLogic)
      .map((taxi: ReserveTaxiListType) => (
        <div 
        key={ taxi.id }
        className='h-12 w-full m-4 grid grid-cols-7 gap-2 items-center'
        >
          <p className={ `${recordFontCSS} h-full py-2 bg-white rounded-xl` }>{ taxi.name }</p>
          <p className={ `${recordFontCSS} h-full py-2 bg-white rounded-xl` }>{ taxi.reservationTime instanceof Date ? formatTime(taxi.reservationTime) : taxi.reservationTime }
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