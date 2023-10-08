import CustomButton from "@/app/utils/components/CustomButton";
import { fetchAllGeneralTaxis } from "@/app/utils/utils";
import { useState } from "react";
import { TaxiReservationProps } from "../../../../../types/types";
import CustomSelect from "@/app/utils/components/CustomSelect";

const TaxiReservation = ({ operationType, onSubmit, setEditing, setGeneralTaxis, initialValues  }: TaxiReservationProps) => {
  const [section, setSection] = useState<number>(initialValues?.section || 0);
  const [column, setColumn] = useState<number>(initialValues?.column || 0);
  const [index, setIndex] = useState<number>(initialValues?.index || 0);
  const [peopleCount, setPeopleCount] = useState<number>(initialValues?.peopleCount || 0);
  const [carCount, setCarCount] = useState<number>(initialValues?.carCount || 0);

  const createOptionsArray = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push({ value: i, label: i.toString() });
    }
    return options;
  }

  const sectionOptions = createOptionsArray(122, 128);
  const columnOptions = createOptionsArray(1, 11);
  const indexOptions = createOptionsArray(1, 20);
  const peopleCountOptions = createOptionsArray(0, 4);
  const carCountOptions = createOptionsArray(0, 5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await onSubmit(section, column, index, peopleCount, carCount);
      const fetchedGeneralTaxi = await fetchAllGeneralTaxis();
      setGeneralTaxis(fetchedGeneralTaxi);
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
          <div className="flex h-56">
            <div className="w-72">
              <p className="text-3xl w-full text-center">Section</p>
              <div className="h-full w-full text-center">
                <div className="p-4 h-2/3 w-full">
                  <CustomSelect
                    options={ sectionOptions }
                    name="section"
                    value={ section }
                    onChange={ setSection }
                  />
                </div>
              </div>
            </div>
            <div className="w-48">
              <p className="text-3xl w-full text-center">列</p>
              <div className="h-full w-full text-center">
                <div className="p-4 h-2/3 w-full">
                  <CustomSelect
                    options={ columnOptions }
                    name="column"
                    value={ column }
                    onChange={ setColumn }
                  />
                </div>
              </div>
            </div>
            <div className="w-48">
              <p className="text-3xl w-full text-center">番号</p>
              <div className="h-full w-full text-center">
                <div className="p-4 h-2/3 w-full">
                  <CustomSelect
                    options={ indexOptions }
                    name="index"
                    value={ index }
                    onChange={ setIndex }
                  />
                </div>
              </div>
            </div>
            <div className="w-48">
              <p className="text-3xl w-full text-center">人数</p>
              <div className="h-full w-full text-center">
                <div className="p-4 h-2/3 w-full">
                  <CustomSelect
                    options={ peopleCountOptions }
                    name="peopleCount"
                    value={ peopleCount }
                    onChange={ setPeopleCount }
                  />
                </div>
              </div>
            </div>
            <div className="w-48">
              <p className="text-3xl w-full text-center">台数</p>
              <div className="h-full w-full text-center">
                <div className="p-4 h-2/3 w-full">
                  <CustomSelect
                    options={ carCountOptions }
                    name="carCount"
                    value={ carCount }
                    onChange={ setCarCount }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 h-40 flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-8 px-16 text-4xl" }/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxiReservation;