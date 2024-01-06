'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../utils/components/Sidebar';
import { bgEditCSS, bgGrayCSS, indexFontCSS, pageTitleCSS, recordFontCSS } from '../utils/style';
import CustomButton from '../utils/components/CustomButton';
import { InChargeType } from '../../../types/types';
import { deleteData, fetchInCharge, postData, updateData } from '../utils/utils';

function Reception() {
  const [adding, setAdding] = useState<boolean>(false);
  const [inCharge, setInCharge] = useState<InChargeType[]>([]);
  const [editingInChargeId, setEditingInChargeId] = useState<number | null>(null);
  const [editingInChargeName, setEditingInChargeName] = useState<string>("");

  const handleAddInCharge = async (name: string) => {
    const data = {
      name: name
    }

    await postData("inCharge", data);
    fetchInCharge(setInCharge);
    setAdding(false);
  }

  const handleEditInCharge = async (id: number) => {
    if (!editingInChargeId) return

    const data = {
      name: editingInChargeName
    }

    await updateData("inCharge", data, id);
    fetchInCharge(setInCharge);
    setEditingInChargeId(null);
  }


  const handleDelete = async (id: number) => {
    try {
      await deleteData("inCharge", id);
      fetchInCharge(setInCharge);
    } catch (error) {
      console.error("Failed to delete inCharge:", error);
    }
  };

  useEffect(() => {
    fetchInCharge(setInCharge);
    }, [setInCharge]);

  return (
    <div className='mx-8'>
      <div className="m-8">
        <Sidebar/>
      </div>
      <div>
        <div>
          <h1 className={ pageTitleCSS }>個室担当者</h1>
        </div>
        <div className={`${bgGrayCSS} mt-8`}>
          <div className='grid grid-cols-4'>
            <p className={ `${indexFontCSS} col-span-2`}>担当者名</p>
          </div>
          { inCharge
          .sort((a: InChargeType, b: InChargeType) => a.id - b.id)
          .map((inCharge: InChargeType) => (
          <div key={ inCharge.id } className='grid grid-cols-4 items-center'>
            { editingInChargeId === inCharge.id ? (
              <div className='col-span-3 grid grid-cols-3'>
                <input 
                  type="text"
                  name='name'
                  defaultValue={ inCharge.name }
                  onChange={ (e) => setEditingInChargeName(e.target.value)}
                  className={`${recordFontCSS} mx-16 my-4 p-4 col-span-2 bg-white border-4 border-blue-500 rounded-xl`}
                  />
                <CustomButton
                  text='完了'
                  onClick={ () => handleEditInCharge(editingInChargeId) }
                  className='m-4 p-4'
                />
              </div>
            ) : (
              <div className='col-span-3 grid grid-cols-3'>
                <p className={`${recordFontCSS} mx-16 my-4 p-4 col-span-2 bg-white rounded-xl`}>{ inCharge.name }</p>
                <CustomButton
                text='編集'
                onClick={ () => {
                  setEditingInChargeId(inCharge.id) 
                  setEditingInChargeName(inCharge.name)
                }}
                className='m-4 p-4'
                />
              </div>
            )}
            <CustomButton
              text='削除'
              onClick={ () => handleDelete(inCharge.id) }
              className='m-4 p-4'
            />
          </div>
          ))}
        </div>
        { (adding) ? (
          <div className={`${bgEditCSS} h-auto w-full my-8 items-center`}>
            <div className={`grid grid-cols-4`}>
              <input 
                type="text"
                name='name'
                onChange={ (e) => setEditingInChargeName(e.target.value)}
                className={`${recordFontCSS} mx-16 my-4 p-4 col-span-2 bg-white border-4 border-blue-500 rounded-xl`}
                />
              <CustomButton
                text='完了'
                onClick={ () => handleAddInCharge(editingInChargeName) }
                className='m-4 p-4'
              />
              <CustomButton
                text='取消'
                onClick={ () => {
                  setAdding(false)
                  setEditingInChargeName("")
                } }
                className='m-4 p-4'
              />
            </div>
          </div>
        ) : (
          <div className='h-auto w-auto p-4 my-8 flex items-center justify-center'>
            <CustomButton
              text='追加'
              onClick={ () => {
                setAdding(true)
                setEditingInChargeName("")
              }}
              className='my-4 py-6 px-16 text-xl'
              />
          </div>
        )}
      </div>
    </div>
  )
}

export default Reception