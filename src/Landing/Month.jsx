import { useState } from "react";
import "./Month.css";

function Month() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
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

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get current month and year
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();

  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Go to previous month
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Go to next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Check whether a date is today
  const isToday = (day) => {
    const today = new Date();

    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Create calendar dates
  const calendarDays = [];

  // Empty boxes before the first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="calendar-container">
      <div className="calendar">
        {/* Calendar Header */}
        <div className="calendar-header">
          <button onClick={previousMonth}>←</button>

          <h1>
            {monthNames[month]} {year}
          </h1>

          <button onClick={nextMonth}>→</button>
        </div>

        {/* Days of Week */}
        <div className="weekdays">
          {dayNames.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="dates">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`date ${day && isToday(day) ? "today" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Month;
