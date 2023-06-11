import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';

const Calendar = () => {
  const [monthShift, changeShift] = useState(0);

  const date = useMemo(() => {
    let val = dayjs();
    if (monthShift < 0) {
      val = val.subtract(monthShift, 'month');
    } else if (monthShift > 0) {
      val = val.add(monthShift, 'month');
    }
    return val;
  }, [monthShift]);

  const firstDayShift = Math.abs(date.startOf('month').day());

  const daysInMonth = useMemo(() => {
    let val = new Array(date.daysInMonth())
      .fill(null)
      .map((_val, index) => index + 1);
    if (firstDayShift !== 1)
      val.unshift(
        ...(new Array(
          firstDayShift !== 0 ? firstDayShift - 1 : firstDayShift
        ).fill(-1) as any)
      );
    return val;
  }, [monthShift, date]);

  const days = () =>
    daysInMonth.map((date) => {
      if (+date !== -1) {
        const cellVal = date < 10 ? `0${date}` : date;
        return (
          <span className='flex items-center justify-center cursor-pointer'>{cellVal}</span>
        );
      }
      return <span className='flex items-center justify-center'></span>;
    });
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className='flex flex-col items-center w-[330px] h-[330px] px-[46px] py-[34px] bg-white rounded-s'>
      <div className='flex w-full justify-between'>
        <span onClick={() => changeShift((prev) => prev - 1)}>{'<'}</span>
        {date.format('MMM')}
        <span onClick={() => changeShift((prev) => prev + 1)}>{'>'}</span>
      </div>

      <div className='  grid grid-cols-7 w-full h-full'>
        {weekDays.map((day) => (
          <span className='flex items-center justify-center'>{day}</span>
        ))}
        {days()}
      </div>
    </div>
  );
};

export default Calendar;
