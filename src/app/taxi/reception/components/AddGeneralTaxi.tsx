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
      <div className="w-4/5 max-w-[600px] mx-auto mb-5 p-4 justify-center bg-white rounded-2xl">
        <form onSubmit={ handleSubmit }>
          <div className="">
            <div className="grid grid-cols-4">
              <div className="col-span-2">
                <p className={ indexFontCSS }>Section</p>
                <div className="text-center">
                  <div className="p-4">
                    <CustomSelect
                      options={ sectionOptions }
                      name="section"
                      value={ section }
                      onChange={ setSection }
                      className="text-3xl"
                      styles={ taxiReceptoinLargeSelectStyles }
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <p className={ indexFontCSS }>列</p>
                <div className=" text-center">
                  <div className="p-4 ">
                    <CustomSmallSelect
                      options={ columnOptions }
                      name="column"
                      value={ column }
                      onChange={ setColumn }
                      className="text-3xl "
                      styles={ taxiReceptoinSelectStyles }
                      />
                  </div>
                </div>
              </div>
              <div className="">
                <p className={ indexFontCSS }>番号</p>
                <div className=" text-center">
                  <div className="p-4 ">
                    <CustomSmallSelect
                      options={ indexOptions }
                      name="index"
                      value={ index }
                      onChange={ setIndex }
                      className="text-3xl "
                      styles={ taxiReceptoinSelectStyles }
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-36 grid grid-cols-3">
              <div className="">
                <p className={` ${indexFontCSS} h-1/5`}>台数</p>
                <div className="text-center">
                  <div className="p-4">
                    <CustomSmallSelect
                      options={ carCountOptions }
                      name="carCount"
                      value={ carCount }
                      onChange={ setCarCount }
                      className="text-3xl "
                      styles={ taxiReceptoinSelectStyles }
                      />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <p className={` ${indexFontCSS} h-1/5`}>memo</p>
                <div className="text-center items-center">
                  <div className="p-3">
                    <input
                      type="text"
                      value={ memo }
                      onChange={ (e) => setMemo(e.target.value) }
                      className="w-full p-5 text-2xl border-2 border-gray-400 rounded-xl"
                      placeholder="memo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-4 px-10 text-3xl" }/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGeneralTaxi;