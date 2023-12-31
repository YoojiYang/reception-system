import { bgDarkGrayCSS, recordFontCSS } from "@/app/utils/style"
import { CompleteListProps, ReserveTaxiListType } from "../../../../../types/types"
import CustomIconButton from "@/app/utils/components/CustomIcomButton"
import { formatTime } from "@/app/utils/utils"

const CompleteList = ({ title, filterLogic, reserveTaxiList, handleOnSubmit, onClickTarget, icon: IconComponent }: CompleteListProps) => {
  return (
    <div>
      <div className={`${bgDarkGrayCSS} mt-8`}>
        <div className="flex mx-8">
          <h2 className="text-center text-2xl font-bold">{ title }</h2>
        </div>
        {reserveTaxiList
        .filter(filterLogic)
        .map((taxi: ReserveTaxiListType) => (
          <div 
          key={ taxi.id }
          className='h-auto m-4 grid grid-cols-7 gap-2 items-center'
          >
            <p className={ `${recordFontCSS} h-full py-2 bg-gray-300 rounded-xl` }>
              { taxi.name }
              </p>
            <p className={ `${recordFontCSS} h-full py-2 bg-gray-300 rounded-xl` }>
              { taxi.reservationTime instanceof Date ? formatTime(taxi.reservationTime) : taxi.reservationTime }
            </p>
            <p className={ `${recordFontCSS} h-full py-2 bg-gray-300 rounded-xl col-span-2` }>
              担当者,担当者、担当者
            </p>
            <p className={ `${recordFontCSS} h-full py-2 bg-gray-300 rounded-xl col-span-2` }>
              { taxi.taxiCompany }
            </p>
            <div className="flex justify-center items-center space-x-2">
              <CustomIconButton
                onClick={ () => handleOnSubmit(onClickTarget, taxi) }
                className="bg-gray-300 hover:bg-gray-700 "
              >
                <IconComponent />
              </CustomIconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompleteList