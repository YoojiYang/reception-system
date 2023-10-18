'use client';

import { useState } from 'react';
import ReserveList from './components/ReserveList';
import EditReserveList from './components/EditReserveList';
import Sidebar from '../utils/components/Sidebar';
import { bgEditCSS, bgGrayCSS, pageTitleCSS } from '../utils/style';

function Reception() {
  const [editing, setEditing] = useState<boolean>(false); // 編集画面かどうかを判断するためのstate

  return (
    <div className='mx-8'>
      <div className="m-8">
        <Sidebar />
      </div>
      <div>
        <h1 className={ pageTitleCSS }>予約情報登録</h1>
      </div>
      { !editing && (
        <div className={`${bgGrayCSS} mt-8`}>
          <ReserveList setEditing={ setEditing } />
        </div>
      )}
      { editing && (
        <div className={`${bgEditCSS} mt-8`}>
          <EditReserveList setEditing={ setEditing } />
        </div>
      )}
    </div>
  )
}

export default Reception