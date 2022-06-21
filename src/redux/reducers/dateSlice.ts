import { createSlice } from '@reduxjs/toolkit';

let now = new Date();
const start = new Date(now.setDate(now.getDate() + 7));
now = new Date();
const end = new Date(now.setDate(now.getDate() + 8));
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

const startYear = start.getFullYear();
const endYear = end.getFullYear();

let startMonth = (start.getMonth() + 1).toString();
if (startMonth.length === 1) {
  startMonth = `0${startMonth}`;
}
let endMonth = (end.getMonth() + 1).toString();
if (endMonth.length === 1) {
  endMonth = `0${endMonth}`;
}
let startDate = start.getDate().toString();
if (startDate.length === 1) {
  startDate = `0${startDate}`;
}
let endDate = end.getDate().toString();
if (endDate.length === 1) {
  endDate = `0${endDate}`;
}

const startDay = WEEKDAY[start.getDay()];
const endDay = WEEKDAY[end.getDay()];

const startFull = startYear + startMonth + startDate;
const endFull = endYear + endMonth + endDate;

let count = 0;

if (startMonth !== endMonth) {
  for (let i = 0; i < Number(endMonth) - Number(startMonth); i += 1) {
    const thisLast = new Date(Number(startYear), Number(startMonth) + i, 0);
    const thisLastDate = thisLast.getDate();
    count += thisLastDate;
  }
}
const days = count + Number(endDate) - Number(startDate);

const dateString = `${startMonth}.${startDate}(${startDay}) ~ ${endMonth}.${endDate}(${endDay}) ${days}박`;

const initialState = {
  date: {
    start: startFull,
    end: endFull,
  },
  dateString,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate(state, action) {
      return {
        date: action.payload.date,
        dateString: action.payload.dateString,
      };
    },
    initDate(state) {
      return initialState;
    },
  },
});

export const dateActions = dateSlice.actions;
export default dateSlice.reducer;
