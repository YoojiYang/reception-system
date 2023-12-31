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
        <div className='h-full p-2 bg-white rounded-2xl'>
          <AddGeneralTaxi setTaxis={ setTaxis }/>
        </div>
        <div className='h-8 mt-4 grid grid-cols-8 gap-2 items-center'>
          <p className={ indexFontCSS }>タグ</p>
          <p className={ indexFontCSS }>Section</p>
          <p className={ indexFontCSS }>列</p>
          <p className={ indexFontCSS }>番</p>
          <p className={ indexFontCSS }>memo</p>
        </div>
      </div>
      <div>
        <div className='h-full p-2 bg-white rounded-2xl'>
          {taxis
            .filter((taxi: TaxiType) => taxi.isGeneralTaxi)
            .sort((a: TaxiType, b: TaxiType) => a.id - b.id)
            .map((taxi: TaxiType) => (
              <div key={taxi.id} className=' mt-4 grid grid-cols-8 gap-2 items-center'>
                {/* 編集モード */}
                { editingTaxiId === taxi.id ? (
                <div className="col-span-6 grid grid-cols-6">
                  <p className={ recordFontCSS }>T{ taxi.generalTaxiId}</p>
                  <div className="w-full">
                    <div className="">
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
                    <div className="">
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
                    <div className="">
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
                    <div className="">
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
                ) : (
                // 通常表示モード
                <div className="col-span-6 grid grid-cols-8">
                  <p className={ recordFontCSS }>T{ taxi.generalTaxiId}</p>
                  <p className={ recordFontCSS }>{ taxi.section }</p>
                  <p className={ recordFontCSS }>{ taxi.column }</p>
                  <p className={ recordFontCSS }>{ taxi.index }</p>
                  <p className={ recordFontCSS }>{ taxi.memo }</p>
                </div>
                )}
                <div className="col-span-2">
                  <CustomButton
                  text={ editingTaxiId === taxi.id ? "完了" : "編集" }
                  onClick={ async () => {
                    if (editingTaxiId === taxi.id) {
                      // 完了ボタンを押した時の処理
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
                    } else {
                      // 編集ボタンを押した時
                      setEditingTaxiId(taxi.id);
                      setSection(taxi.section || 122);
                      setColumn(taxi.column || 1);
                      setIndex(taxi.index || 1);
                      setMemo(taxi.memo || "");
                    }
                  }}
                  className={ "py-2 px-2 text-lg" }
                  />
                  <CustomButton
                  text={ "削除" }
                    onClick={ () => {
                      deleteData("taxi", taxi.id);
                      setTaxis(prevTaxis => prevTaxis.filter(t => t.id !== taxi.id));
                    }}
                    className={ "py-2 px-2 text-lg"}
                  />
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeneralTaxi;