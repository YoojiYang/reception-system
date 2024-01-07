import { deleteData, updateData } from "@/app/utils/utils";
import { GeneralTaxiData, TaxiType } from "../../../../../types/types";
import { useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import AddGeneralTaxi from "./AddGeneralTaxi";
import { indexFontCSS, recordFontCSS } from "@/app/utils/style";
import { fetchTaxis, useTaxis } from "@/app/context/TaxiContext";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { columnOptions, indexOptions, sectionOptions, taxiReceptoinLargeSelectStyles, taxiReceptoinSelectStyles } from "@/app/utils/selectOptions";
import CustomSmallSelect from "@/app/utils/components/CustomSmallSelect";


const GeneralTaxi = () => {
  const { taxis, setTaxis } = useTaxis();
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  const [section, setSection] = useState<number>(122);
  const [column, setColumn] = useState<number>(1);
  const [index, setIndex] = useState<number>(1);
  const [memo, setMemo] = useState<string>("");

  const totalCarCount = taxis.reduce((acc: number, taxi: TaxiType) => {
    return taxi.isGeneralTaxi ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    fetchTaxis(setTaxis);
  }, [setTaxis]);

  return (
    <div>
      <div>
        <div className="h-auto m-4 py-4 flex space-x-12 items-end">
          <h2 className="text-2xl font-bold">一般タクシー</h2>
          <p className="text-xl">
            予約合計
            <span className="mx-2 text-3xl font-bold">
              { totalCarCount }
            </span>
            台
          </p>
        </div>
        <div className='p-2'>
          <AddGeneralTaxi setTaxis={ setTaxis }/>
        </div>
      </div>
      <div>
        <div className='h-8 mt-4 grid grid-cols-7 gap-2 items-center'>
          <p className={ indexFontCSS }>タグ</p>
          <p className={ indexFontCSS }>Section</p>
          <p className={ indexFontCSS }>列</p>
          <p className={ indexFontCSS }>番</p>
          <p className={ indexFontCSS }>memo</p>
        </div>
        <div className='h-full p-2 bg-white rounded-2xl'>
          {taxis
            .filter((taxi: TaxiType) => taxi.isGeneralTaxi)
            .sort((a: TaxiType, b: TaxiType) => a.id - b.id)
            .map((taxi: TaxiType) => (
              <div key={taxi.id} className='p-2'>
                {/* 編集モード */}
                { editingTaxiId === taxi.id ? (
                <div className="grid grid-cols-7 bg-blue-100 rounded-xl">
                  <p className={ recordFontCSS }>T{ taxi.generalTaxiId}</p>
                  <div className="p-4">
                    <CustomSelect
                      options={ sectionOptions }
                      name="section"
                      value={ section }
                      onChange={ setSection }
                      className="text-2xl "
                      styles={ taxiReceptoinLargeSelectStyles }
                    />
                  </div>
                  <div className="p-4 ">
                    <CustomSmallSelect
                      options={ columnOptions }
                      name="column"
                      value={ column }
                      onChange={ setColumn }
                      className="text-2xl "
                      styles={ taxiReceptoinSelectStyles }
                    />
                  </div>
                  <div className="p-4">
                    <CustomSmallSelect
                      options={ indexOptions }
                      name="index"
                      value={ index }
                      onChange={ setIndex }
                      className="text-2xl "
                      styles={ taxiReceptoinSelectStyles }
                    />
                  </div>
                  <div className="p-4 flex">
                    <input
                      type="text"
                      value={ memo }
                      onChange={ (e) => setMemo(e.target.value) }
                      className="w-full text-center text-2xl rounded-2xl"
                      placeholder="memo"
                    />
                  </div>
                  <div className="w-fit px-4 flex gap-2" >
                    <CustomButton
                      text={ "完了" }
                      className={ "w-24 my-auto py-2 px-6 text-lg" }
                      onClick={ async () => {
                        const data: GeneralTaxiData = {
                          section: section,
                          column: column,
                          index: index,
                          memo: memo,
                          afterEvent: true,
                          isGeneralTaxi: true,
                        };

                        await updateData("taxi", data, taxi.id);

                        setTaxis(prevTaxis =>
                          prevTaxis.map(t => (t.id === taxi.id ? { ...t, ...data } : t))
                        );
                        setEditingTaxiId(null);
                      }}
                    /> 
                    <CustomButton
                    text={ "削除" }
                    className={ "w-24 my-auto py-2 px-6 text-lg"}
                    onClick={ () => {
                      deleteData("taxi", taxi.id);
                      setTaxis(prevTaxis => prevTaxis.filter(t => t.id !== taxi.id));
                    }}
                    />
                  </div>
                </div>
                ) : (
                // 通常表示モード
                <div className="grid grid-cols-7">
                  <p className={ recordFontCSS }>T{ taxi.generalTaxiId}</p>
                  <p className={ recordFontCSS }>{ taxi.section }</p>
                  <p className={ recordFontCSS }>{ taxi.column }</p>
                  <p className={ recordFontCSS }>{ taxi.index }</p>
                  <p className={ recordFontCSS }>{ taxi.memo }</p>
                  <div className="w-fit px-4 flex gap-2" >
                    <CustomButton
                      text={ "編集" }
                      className={ "w-24 my-auto py-2 px-6 text-lg" }
                      onClick={ async () => {
                          setEditingTaxiId(taxi.id);
                          setSection(taxi.section || 122);
                          setColumn(taxi.column || 1);
                          setIndex(taxi.index || 1);
                          setMemo(taxi.memo || "");
                      }}
                    /> 
                    <CustomButton
                      text={ "削除" }
                      className={ "w-24 my-auto py-2 px-6 text-lg"}
                      onClick={ () => {
                        deleteData("taxi", taxi.id);
                        setTaxis(prevTaxis => prevTaxis.filter(t => t.id !== taxi.id));
                      }}
                    />
                  </div>
                </div>
                )}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeneralTaxi;