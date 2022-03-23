import React, { useEffect, useRef, useState } from 'react';
import './BirthSelector.scss';
import classNames from 'classnames';
import Birth from './Birth';

function BirthSelector(props: { changeBirth: (year: number, month: number, day: number) => void }) {
  const [selectedYear, setSelectedYear] = useState<number>(1990);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const { years, months, days, leapYear } = Birth(1990, 2022, true);
  const [dayArray, setDayArray] = useState<(number|string)[]>(days[0]);
  const yearRef = useRef<any>(null);
  const monthRef = useRef<any>(null);
  const dayRef = useRef<any>(null);
  
  const { changeBirth } = props;
  
  useEffect(()=>{
    if(leapYear.includes(selectedYear)){
      if(selectedMonth===2){
        days[selectedMonth-1].splice(31,0,29);
      }
    }
    setDayArray(days[selectedMonth-1]);

  },[selectedMonth,selectedYear]);

  useEffect(() => {
    if (selectedYear) {
      yearRef.current.scrollTop = (selectedYear - 1990) * 30;
    }
    if (selectedMonth) {
      monthRef.current.scrollTop = (selectedMonth - 1) * 30;
    }
    if (selectedDay) {
      dayRef.current.scrollTop = (selectedDay - 1) * 30;
    }
    changeBirth(selectedYear, selectedMonth, selectedDay);
  }, [selectedYear, selectedMonth, selectedDay]);

  const yearContext = years.map((year, i) => {
    if (year === '.') return <div className="birth-item blank">.</div>;
    return (
      <div key={year} className={classNames('birth-item', { selected: year === selectedYear })}>{`${year}년`}</div>
    );
  });
  const monthContext = months.map((month, i) => {
    if (month === '.') return <div className="birth-item blank">.</div>;
    return (
      <div key={`m${month}`} className={classNames('birth-item', { selected: month === selectedMonth })}>
        {month >= 10 ? `${month}월` : `0${month}월`}
      </div>
    );
  });
  const dayContext = dayArray.map((day, i) => {
    if (day === '.') return <div className="birth-item blank">.</div>;
    return (
      <div key={`d${day}`} className={classNames('birth-item', { selected: day === selectedDay })}>
        {day >= 10 ? `${day}일` : `0${day}일`}
      </div>
    );
  });

  const yearScrollHandler = () => {
    const { scrollTop } = yearRef.current;
    const year = Math.round(scrollTop / 30) + 1990;
    setSelectedYear(year);
  };

  const monthScrollHandler = () => {
    const { scrollTop } = monthRef.current;
    const month = Math.round(scrollTop / 30) + 1;
    setSelectedMonth(month);
  };

  const dayScrollHandler = () => {
    const { scrollTop } = dayRef.current;
    const day = Math.round(scrollTop / 30) + 1;
    setSelectedDay(day);
  };

  return (
    <div className="birth">
      <div className="birth-years tab" ref={yearRef} onScroll={yearScrollHandler}>
        {yearContext}
      </div>
      <div className="birth-months tab" ref={monthRef} onScroll={monthScrollHandler}>
        {monthContext}
      </div>
      <div className="birth-days tab" ref={dayRef} onScroll={dayScrollHandler}>
        {dayContext}
      </div>
    </div>
  );
}

export default BirthSelector;
