import CustomButton from "@/app/utils/components/CustomButton";
import { useState } from "react";
import { TaxiReservationProps } from "../../../../../types/types";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { carCountOptions, columnOptions, indexOptions, peopleCountOptions, sectionOptions, taxiReceptoinLargeSelectStyles, taxiReceptoinSelectStyles } from "@/app/utils/selectOptions";
import CustomSmallSelect from "@/app/utils/components/CustomSmallSelect";
import { indexFontCSS } from "@/app/utils/style";

const TaxiReservation = ({ operationType, onSubmit, setEditing, setGeneralTaxis, initialValues }: TaxiReservationProps) => {
  const [section, setSection] = useState<number>(initialValues?.section || 0);
  const [column, setColumn] = useState<number>(initialValues?.column || 0);
  const [index, setIndex] = useState<number>(initialValues?.index || 0);
  const [peopleCount, setPeopleCount] = useState<number>(initialValues?.taxi.peopleCount || 0);
  const [carCount, setCarCount] = useState<number>(initialValues?.taxi.carCount || 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      onSubmit(section, column, index, peopleCount, carCount);
    } catch (error) {
      console.error(error);
      return;
    }
  setEditing(false);
  };

  return (
    <div>
      <div className="p-2 h-auto w-full">
        <form onSubmit={ handleSubmit }>
          <div className="flex">
            <div className="w-full">
              <p className={ indexFontCSS }>Section</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <CustomSelect
                    options={ sectionOptions }
                    name="section"
                    value={ section }
                    onChange={ setSection }
                    className="text-3xl w-full"
                    styles={ taxiReceptoinLargeSelectStyles }
                    />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className={ indexFontCSS }>列</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <CustomSmallSelect
                    options={ columnOptions }
                    name="column"
                    value={ column }
                    onChange={ setColumn }
                    className="text-3xl w-full"
                    styles={ taxiReceptoinSelectStyles }
                    />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className={ indexFontCSS }>番号</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <CustomSmallSelect
                    options={ indexOptions }
                    name="index"
                    value={ index }
                    onChange={ setIndex }
                    className="text-3xl w-full"
                    styles={ taxiReceptoinSelectStyles }
                    />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className={ indexFontCSS }>人数</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <CustomSmallSelect
                    options={ peopleCountOptions }
                    name="peopleCount"
                    value={ peopleCount }
                    onChange={ setPeopleCount }
                    className="text-3xl w-full"
                    styles={ taxiReceptoinSelectStyles }
                    />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className={ indexFontCSS }>台数</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <CustomSmallSelect
                    options={ carCountOptions }
                    name="carCount"
                    value={ carCount }
                    onChange={ setCarCount }
                    className="text-3xl w-full"
                    styles={ taxiReceptoinSelectStyles }
                    />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 h-auto flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-6 px-10 text-4xl" }/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxiReservation;