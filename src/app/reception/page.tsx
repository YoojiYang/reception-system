'use client';

import { useState } from 'react';
import ReserveList from './components/ReserveList';
import EditReserveList from './components/EditReserveList';

function Reception() {
  const [editing, setEditing] = useState<boolean>(false); // 編集画面かどうかを判断するためのstate

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 text-4xl'>利用者情報登録</h1>
      </div>
      {/* コンテンツ */}
      { !editing && <ReserveList setEditing={ setEditing } />}
      { editing && <EditReserveList setEditing={ setEditing } />}
    </div>
  )
}

export default Reception