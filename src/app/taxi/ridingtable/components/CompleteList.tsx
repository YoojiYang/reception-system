import { bgDarkGrayCSS, recordFontCSS } from "@/app/utils/style"
import { CompleteListProps, TaxiType } from "../../../../../types/types"
import CustomIconButton from "@/app/utils/components/CustomIcomButton"
import { formatTime } from "@/app/utils/utils"
import { useTaxis } from "@/app/context/TaxiContext"

const CompleteList = ({ title, filterLogic, handleOnSubmit, onClickTarget, icon: IconComponent }: CompleteListProps) => {
  const { taxis } = useTaxis();

  return (
    <div>
      <div className={`${bgDarkGrayCSS} mt-8`}>
        <div className="flex mx-8">
          <h2 className="text-center text-2xl font-bold">{ title }</h2>
        </div>
        {taxis
        .filter(filterLogic)
        .map((taxi: TaxiType) => (
          <div 
          key={ taxi.id }
          className='h-auto m-4 grid grid-cols-7 gap-2 items-center'
          >
            <p className={ `${recordFontCSS} h-full py-2 bg-gray-300 rounded-xl` }>
              { taxi.isGeneralTaxi ? "T" + taxi.generalTaxiId : taxi.room?.name }
              </p>
            <p className={ `${recordFontCSS} h-full py-2 bg-gray-300 rounded-xl` }>
              { taxi.afterEvent ? "試合終了後" : formatTime(taxi.reservationTime) }
            </p>
            {/* TODO: 担当者を動的に変更 */}
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