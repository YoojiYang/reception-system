const ReserveIndex = () => {
  return (
    <div>
      <div className='h-8 mt-4 grid grid-cols-9 gap-2 items-center'>
        <p className='text-center h-full flex items-center justify-center'>部屋名</p>
        <p className='col-span-3 text-center h-full flex items-center justify-center'>会社名</p>
        <p className='text-center h-full flex items-center justify-center'>大人</p>
        <p className='text-center h-full flex items-center justify-center'>子ども</p>
        {/* <p className='text-center h-full flex items-center justify-center'>到着時刻</p> */}
        <p className='col-span-3 text-center h-full flex items-center justify-center'>担当者</p>
      </div>
    </div>
  );
}

export default ReserveIndex;