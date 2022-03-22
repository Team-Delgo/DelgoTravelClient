import React from 'react';

function Birth(yearStart: number, yearEnd: number, forSelector: boolean) {
  let years: (number | string)[] = [];
  let months: (number | string)[] = [];
  const days: (number | string)[][] = [];

  if (forSelector) {
    years = ['.', '.', '.'];
    months = ['.', '.', '.'];
  }

  for (let i = 1990; i <= 2022; i += 1) {
    years.push(i);
  }
  for (let i = 1; i <= 12; i += 1) {
    months.push(i);
  }
  const day31: (number | string)[] = ['.', '.', '.'];
  const day30: (number | string)[] = ['.', '.', '.'];
  const day28: (number | string)[] = ['.', '.', '.'];
  for (let i = 1; i <= 31; i += 1) {
    if (i === 31) {
      day31.push(i);
      break;
    }
    if (i >= 29) {
      day30.push(i);
      day31.push(i);
    } else {
      day31.push(i);
      day30.push(i);
      day28.push(i);
    }
  }
  if (forSelector) {
    for (let i = 0; i < 3; i += 1) {
      day28.push('.');
      day30.push('.');
      day31.push('.');
    }
  }
  days.push(day31);
  days.push(day28);
  days.push(day31);
  days.push(day30);
  days.push(day31);
  days.push(day30);
  days.push(day31);
  days.push(day31);
  days.push(day30);
  days.push(day31);
  days.push(day30);
  days.push(day31);

  if (forSelector) {
    for (let i = 0; i < 3; i += 1) {
      years.push('.');
      months.push('.');
    }
  }

  return { years, months, days };
}

export default Birth;
