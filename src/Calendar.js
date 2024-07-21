/* eslint-disable no-loop-func */
import './App.css';

function toCamelCase(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};

const daysOfTheWeek = [
  { name: "Понедельник", short: "Пн" },
  { name: "Вторник", short: "Вт" },
  { name: "Среда", short: "Ср" },
  { name: "Четверг", short: "Чт" },
  { name: "Пятница", short: "Пт" },
  { name: "Суббота", short: "Сб" },
  { name: "Воскресенье", short: "Вс" }
];

function Calendar({date}){
  const nowDay = date.toLocaleDateString("ru-RU", { weekday: 'long' });
  const nowDayNum = date.getDate();
  const nowMonth = date.toLocaleDateString("ru-RU", { month: 'long' });
  const nowYear = date.getFullYear();

  const startDate = new Date(nowYear, date.getMonth(), 1);
  const endDate = new Date(nowYear, date.getMonth() + 1, 0);

  let prefixDays  =  startDate.getDay() - 1;
  const prevMonth = new Date(nowYear, date.getMonth(), 0);
  let prevDates = [...Array(prefixDays)].map((_,index) => prevMonth.getDate() - index).reverse();

  let suffixDays = 0;

  let currentDay = 0; 
  
  const weeks = [];

  while(currentDay < endDate.getDate()){
    weeks.push(
      <tr>
        {prevDates.map((day) => <td className="ui-datepicker-other-month">{day}</td>)}

        {[...Array(7-prefixDays)].map(() => {
          currentDay = currentDay + 1;
        
          if(currentDay === nowDayNum) 
            return(<td className="ui-datepicker-today">{currentDay}</td>);

          if(currentDay <= endDate.getDate())
            return(<td>{currentDay}</td>);
        
          suffixDays = suffixDays + 1;
          return(<td className="ui-datepicker-other-month">{suffixDays}</td>);
        })}
      </tr>
    );
    prefixDays = 0;
    prevDates = [];
  }

  return(
    <div className="ui-datepicker">

      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{toCamelCase(nowDay)}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{nowDayNum}</div>
          <div className="ui-datepicker-material-month">{nowMonth}</div>
          <div className="ui-datepicker-material-year">{nowYear}</div>
        </div>
      </div>

      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{toCamelCase(nowMonth)}</span>&nbsp;<span className="ui-datepicker-year">{nowYear}</span>
        </div>
      </div>

      <table className="ui-datepicker-calendar">
        <thead>
          <tr>
            {daysOfTheWeek.map(day => <th scope="col" title={day.name}>{day.short}</th>)}
          </tr>
        </thead>
        <tbody>
          {weeks}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;