import React, { useState } from 'react';

export const daysOfWeek = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' }
];

//Componente que permite escoger un dia de la semana mediante un selector.
const DaysOfWeekPicker = ({ defaultDay, setDay }) => {
  const [selectedDay, setSelectedDay] = useState(defaultDay);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDay(selectedValue);
    setDay(event.target.value);
  };

  return (
    <div>
      <select className="p-2 rounded" value={selectedDay} onChange={handleSelectChange}>
        {daysOfWeek.map((day) => (
          <option key={day.value} value={day.value}>
            {day.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DaysOfWeekPicker;
