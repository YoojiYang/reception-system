import CustomButton from "@/app/utils/components/CustomButton";
import { useState } from "react";
import { GeneralTaxiData, AddTaxiProps } from "../../../../../types/types";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { carCountOptions, columnOptions, indexOptions, sectionOptions, taxiReceptoinLargeSelectStyles, taxiReceptoinSelectStyles } from "@/app/utils/selectOptions";
import CustomSmallSelect from "@/app/utils/components/CustomSmallSelect";
import { indexFontCSS } from "@/app/utils/style";
import { postData } from "@/app/utils/utils";

const AddGeneralTaxi = ({ setTaxis }: AddTaxiProps) => {
  const [section, setSection] = useState<number>(122);
  const [column, setColumn] = useState<number>(1);
  const [index, setIndex] = useState<number>(1);
  const [carCount, setCarCount] = useState<number>(1);
  const [memo, setMemo] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      for (let i = 0; i < carCount; i++) {
        const data: GeneralTaxiData = {
          section,
          column,
          index,
          memo,
          afterEvent: true,
          isGeneralTaxi: true,
        };
        
        const addedTaxi = await postData("taxi", data);
        setTaxis(prevTaxis => [...prevTaxis, addedTaxi]);
      }
    } catch (error) {
      console.error(error);
      return;
    }
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
            <div className="w-full">
              <p className={ indexFontCSS }>memo</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <input
                    type="text"
                    value={ memo }
                    onChange={ (e) => setMemo(e.target.value) }
                    className="text-3xl w-full"
                    placeholder="memo"
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

export default AddGeneralTaxi;