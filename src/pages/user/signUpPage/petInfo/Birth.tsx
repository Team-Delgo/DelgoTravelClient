import React from "react";

const years: (number|string) [] = ['.','.','.'];
const months: (number|string)[] = ['.','.','.'];
const days: (number|string)[] = ['.','.','.'];
for (let i = 1990; i <= 2022; i += 1) {
  years.push(i);
}
for (let i = 1; i <= 12; i += 1) {
  months.push(i);
}
for (let i = 1; i <= 31; i += 1) {
  days.push(i);
}
for(let i =0;i<3;i+=1){
  years.push('.');
  months.push('.');
  days.push('.');
}

const yearContext = years.map((year) => {
  return <div key={year} className='birth-item'>{year}</div>;
});



const monthContext = months.map((month) => {
  return <div key={`m${month}`} className='birth-item'>{month}</div>;
});


const dayContext = days.map((day) => {
  return <div key={`d${day}`} className='birth-item'>{day}</div>;
});

export { years, months, days };
