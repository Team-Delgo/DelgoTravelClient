import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Calender.scss';
import { ReactComponent as Exit } from '../../icons/exit.svg';
import { dateActions } from '../../redux/slice/dateSlice';
import { getReservedDate } from '../api/calender';
import { errorActions } from '../../redux/slice/errorSlice';
import { currentRoomActions } from '../../redux/slice/roomSlice';
import AlertConfirmOne from '../dialog/AlertConfirmOne';

interface CalenderProps {
  closeCalender: () => void;
  isRoom: boolean;
  roomId?: string;
}

Calender.defaultProps = {
  roomId: 0,
};

function Calender(props: CalenderProps) {
  const dispatch = useDispatch();
  const { date, dateString } = useSelector((state: any) => state.date);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverRange, setIsOverRange] = useState(false);
  const { start, end } = date;
  const [selectedDate, setSelectedDate] = useState({ start, end });
  const dateExist = dateString.length ? 2 : 0;
  const [sequence, setSequence] = useState(dateExist); // 0개 선택, 1개 선택, 2개 선택
  const [reservedDate, setReservedDate] = useState<any[]>();
  const { closeCalender, isRoom, roomId } = props;
  let dateCount = 0;
  let index = 0;
  let roomTotalPrice = 0;

  const errorHandler = () => {
    dispatch(errorActions.setError());
  };

  useEffect(() => {
    if (isRoom) {
      getReservedDate(
        { roomId },
        (response: AxiosResponse) => {
          const { data } = response.data;
          console.log(response);
          setReservedDate(data.dateList);
        },
        errorHandler,
      );
    }
  }, []);

  useEffect(() => {
    if (dateCount >= 14) {
      setSequence(0);
      setIsOverRange(true);
    }

    if (sequence === 2 && isRoom && roomTotalPrice) {
      console.log(roomTotalPrice);
      const tempString = roomTotalPrice.toLocaleString();
      const priceString = `${tempString}원`;
      dispatch(currentRoomActions.currentRoomPrice(priceString));
    }
  }, [sequence]);

  const getNextYear = (currentMonth: number, currentYear: number, add: number) => {
    if (currentMonth + add > 12) {
      return currentYear + 1;
    }
    return currentYear;
  };

  const getToday = () => {
    const date = new Date();
    let today = date.toString().slice(8, 10);
    if (today[0] === '0') {
      today = today.slice(1);
    }
    return today;
  };

  const selectDateHandler = (e: any) => {
    const { id } = e.target;
    const date = id.slice(0, 8);
    if (sequence === 0) {
      setSequence(1);
      setSelectedDate((prev) => {
        return { ...prev, start: date };
      });
    } else if (sequence === 1) {
      setSequence(2);
      if (Number(selectedDate.start) > Number(date)) {
        const reverseDate = selectedDate.start;
        setSelectedDate({ start: date, end: reverseDate });
        return;
      }
      setSelectedDate((prev) => {
        return { ...prev, end: date };
      });
    } else if (sequence === 2) {
      setSequence(1);
      setSelectedDate(() => {
        return { start: date, end: '' };
      });
    }
  };

  const getDateContext = (next: number) => {
    const date = new Date();

    let currentYear = date.getFullYear();
    let currentMonth: string | number = date.getMonth() + next;

    currentYear = getNextYear(currentMonth, currentYear, next);

    const prevLast = new Date(currentYear, currentMonth, 0);
    const thisLast = new Date(currentYear, currentMonth + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate();
    const thisLastDay = thisLast.getDay();

    const thisDates: number[] = [];
    const prevDates: number[] = [];
    const nextDates: number[] = [];

    for (let i = 1; i <= thisLastDate; i += 1) {
      thisDates.push(i);
    }

    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i += 1) {
        prevDates.unshift(prevLastDate - i);
      }
    }

    for (let i = 1; i < 7 - thisLastDay; i += 1) {
      nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(thisLastDate);

    currentMonth += 1;

    if (currentMonth < 10) {
      currentMonth = currentMonth.toString();
      currentMonth = `0${currentMonth}`;
    }

    const datesElement = dates.map((date, i) => {
      let rdate: string | number = date;
      if (date < 10) {
        rdate = date.toString();
        rdate = `0${date}`;
      }

      let condition = i >= firstDateIndex && i <= lastDateIndex;

      const keyCondition = condition ? 'this' : 'other';
      const id = `${currentYear}${currentMonth}${rdate} ${keyCondition}`;
      const circle = sequence === 1 && id.slice(0, 8) === selectedDate.start && keyCondition === 'this';
      const firstDate = sequence === 2 && id.slice(0, 8) === selectedDate.start && keyCondition === 'this';

      const numId = Number(id.slice(0, 8));
      const numStart = Number(selectedDate.start);
      const numEnd = Number(selectedDate.end);

      const middleDate = sequence === 2 && numId > numStart && numId < numEnd && keyCondition === 'this';
      const secondDate = sequence === 2 && id.slice(0, 8) === selectedDate.end && keyCondition === 'this';

      if (next === 0) {
        const today = Number(getToday());
        const gone = date < today;
        let isBooking = false;
        let price = 0;

        if (condition && !gone) {
          if (reservedDate) {
            if (reservedDate[index].isBooking) {
              isBooking = true;
            }
            price = reservedDate[index].price;
            index += 1;
          }
        }
        if (firstDate && secondDate) {
          setSequence(0);
        }
        if (middleDate && isBooking) {
          setSequence(0);
          setIsModalOpen(true);
        }
        if (firstDate || middleDate) {
          // setPrice((prev) => prev + price);
          roomTotalPrice += price;
        }
        if (firstDate || middleDate || secondDate) {
          dateCount += 1;
        }
        return (
          <div
            key={id}
            className={classNames(
              'date-day',
              { able: condition },
              { prev: gone || isBooking },
              { circle },
              { firstDate },
              { middleDate },
              { secondDate },
            )}
            id={id}
            aria-hidden="true"
            onClick={
              condition && !gone && !isBooking
                ? selectDateHandler
                : () => {
                    return 0;
                  }
            }
          >
            {date}
          </div>
        );
      }

      let isBooking = false;
      let price = 0;
      if (condition) {
        if (reservedDate) {
          if (reservedDate[index].isBooking) {
            isBooking = true;
          }
          if (reservedDate.length - 1 > index) {
            price = reservedDate[index].price;
            index += 1;
          } else {
            condition = false;
          }
        }
      }

      if (firstDate && secondDate) {
        setSequence(0);
      }

      if (middleDate && isBooking) {
        setIsModalOpen(true);
        setSequence(0);
      }
      if (firstDate || middleDate) {
        roomTotalPrice += price;
      }
      if (firstDate || middleDate || secondDate) {
        dateCount += 1;
      }

      return (
        <div
          key={id}
          className={classNames(
            'date-day',
            { able: condition },
            { prev: isBooking },
            { circle },
            { firstDate },
            { middleDate },
            { secondDate },
          )}
          id={id}
          aria-hidden="true"
          onClick={
            condition && !isBooking
              ? selectDateHandler
              : () => {
                  return 0;
                }
          }
        >
          {date}
        </div>
      );
    });

    return { datesElement, currentYear, currentMonth };
  };

  const datesElement0 = getDateContext(0);
  const datesElement1 = getDateContext(1);
  const datesElement2 = getDateContext(2);

  const startMonth = selectedDate.start.slice(4, 6);
  const endMonth = selectedDate.end.slice(4, 6);
  const startDate = selectedDate.start.slice(6, 8);
  const endDate = selectedDate.end.slice(6, 8);

  const startYear = selectedDate.start.slice(0, 4);
  const endYear = selectedDate.end.slice(0, 4);

  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

  const startDay = WEEKDAY[new Date(`${startYear}-${startMonth}-${startDate}`).getDay()];
  const endDay = WEEKDAY[new Date(`${endYear}-${endMonth}-${endDate}`).getDay()];

  let count = 0;

  if (sequence === 2 && startMonth !== endMonth) {
    for (let i = 0; i < Number(endMonth) - Number(startMonth); i += 1) {
      const thisLast = new Date(Number(startYear), Number(startMonth) + i, 0);
      const thisLastDate = thisLast.getDate();
      count += thisLastDate;
    }
  }

  const days = count + Number(endDate) - Number(startDate);

  let selectedDateContext =
    sequence === 1 ? (
      <div className="selected-date">
        {startMonth}.{`0${startDate}`.slice(-2)}({startDay})
      </div>
    ) : (
      <div />
    );

  selectedDateContext =
    sequence === 2 ? (
      <div className="selected-date">
        {startMonth}.{`0${startDate}`.slice(-2)}({startDay}) ~ {endMonth}.{`0${endDate}`.slice(-2)}({endDay}) {days}박
      </div>
    ) : (
      selectedDateContext
    );

  const resetHandler = () => {
    setSelectedDate({ start: '', end: '' });
    setSequence(0);
  };

  const moveToPreviousPage = () => {
    closeCalender();
  };

  const confirmDateHandler = () => {
    const selectedDateString = `${startMonth}.${`0${startDate}`.slice(
      -2,
    )}(${startDay}) - ${endMonth}.${`0${endDate}`.slice(-2)}(${endDay}) ${days}박`;
    dispatch(
      dateActions.setDate({
        date: { start: selectedDate.start, end: selectedDate.end },
        dateString: selectedDateString,
      }),
    );
    closeCalender();
  };

  const bottomButton = (
    <div className="bottom-select-button" aria-hidden="true" onClick={confirmDateHandler}>
      {days}박 선택
    </div>
  );

  return (
    <div className="calender">
      {isModalOpen && (
        <AlertConfirmOne
          text="판매완료된 날짜가 포함되어 예약이 불가합니다"
          buttonHandler={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isOverRange && (
        <AlertConfirmOne
          text="최대 14일까지 예약 가능합니다."
          buttonHandler={() => {
            setIsOverRange(false);
          }}
        />
      )}
      <div className="fixed-header">
        <div className="calender-header">
          <Exit onClick={moveToPreviousPage} />
          <h1 className="header-title">날짜선택</h1>
          <span className="header-reset" aria-hidden="true" onClick={resetHandler}>
            초기화
          </span>
        </div>
        {selectedDateContext}
        <div className="day-header">
          <div className="day sun">SUN</div>
          <div className="day">MON</div>
          <div className="day">TUE</div>
          <div className="day">WED</div>
          <div className="day">THU</div>
          <div className="day">FRI</div>
          <div className="day">SAT</div>
        </div>
      </div>
      <div className="date-wrapper">
        <div className="current-month">{`${datesElement0.currentYear}.${datesElement0.currentMonth}`}</div>
        <div className="date">{datesElement0.datesElement}</div>
        <div className="current-month">{`${datesElement1.currentYear}.${datesElement1.currentMonth}`}</div>
        <div className="date">{datesElement1.datesElement}</div>
        <div className="current-month">{`${datesElement2.currentYear}.${datesElement2.currentMonth}`}</div>
        <div className="date">{datesElement2.datesElement}</div>
      </div>
      {sequence === 2 && bottomButton}
    </div>
  );
}

export default Calender;
