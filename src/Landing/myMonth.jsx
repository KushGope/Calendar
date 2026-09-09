import { useState } from "react";
import "./myMonth.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MyMonth() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    if (month === 1) {
      if (isLeapYear(year)) return 29;
      return 28;
    }
    if ([3, 5, 8, 10].includes(month)) return 30;
    return 31;
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  //   const getFirstDayOfMonth = (month, year) => {
  //     let m = month + 1;
  //     let y = year;
  //     if (m === 1 || m === 2) {
  //       m += 12;
  //       y -= 1;
  //     }
  //     const K = y % 100;
  //     const J = Math.floor(y / 100);
  //     let h =
  //       (1 +
  //         Math.floor((13 * (m + 1)) / 5) +
  //         K +
  //         Math.floor(K / 4) +
  //         Math.floor(J / 4) -
  //         2 * J) %
  //       7;
  //     return (h + 5) % 7; // Convert to standard 0=Sunday mapping
  //   };

  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const startDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  const daysGrid = [];
  for (let i = 0; i < startDayIndex; i++) daysGrid.push(null);
  for (let day = 1; day <= totalDays; day++) daysGrid.push(day);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="calendar-sidebar">
          <h2>{currentYear}</h2>
          <p>Custom Engine Active</p>
        </div>

        <div className="calendar-main">
          <div className="calendar-header">
            <button onClick={handlePrevMonth} className="calendar-nav-btn">
              &lt;
            </button>
            <h3 className="calendar-title">{MONTHS[currentMonth]}</h3>
            <button onClick={handleNextMonth} className="calendar-nav-btn">
              &gt;
            </button>
          </div>

          <div className="calendar-grid">
            {WEEKDAYS.map((day) => (
              <div key={day} className="weekday-header">
                {day}
              </div>
            ))}

            {daysGrid.map((day, idx) => (
              <div
                key={idx}
                className={`day-cell ${day ? "active-day" : "empty-pad"}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
