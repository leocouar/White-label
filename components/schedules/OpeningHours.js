import React, { useState, useEffect, use } from 'react';
import DaysOfWeekPicker from './DaysOfWeekPicker';
import TimeSpan from './TimeSpan';
import { daysOfWeek } from './DaysOfWeekPicker';

//Componente que permite determinar una serie de horarios para un dia o rango de dias
const OpeningHours = ({ params, openingHours = {}, disableErrDetection, errDetection = false, onChange }) => {
  const [selectedDays, setSelectedDays] = useState(
    !openingHours.days ?
      params.rangeDays ? [{ day: "Lunes" }, { day: "Viernes" }]
        :
        [{ day: "Lunes" }]
      :
      openingHours.days.map((dayName, index) => ({
        day: dayName.day
      }))
  );
  const [timeSelector, setTimeSpans] = useState(
    !openingHours.openingHours ?
      [{ id: 1, open: null, close: null }]
      :
      openingHours.openingHours.map((timeSpan, index) => ({
        id: index, open: timeSpan.open, close: timeSpan.close
      }))
  );
  const [amountDays, setamountDays] = useState(openingHours.days ? openingHours.days.length : 1);
  const [lastUsedId, setLastUsedId] = useState(1);

  const addDay = () => {
    disableErrDetection();
    const newSelectedDays = [...selectedDays, { day: 'Lunes' }];
    setSelectedDays(newSelectedDays);
    setamountDays(amountDays + 1);
  };

  const deleteDay = () => {
    disableErrDetection();
    const newSelectedDays = [...selectedDays];
    newSelectedDays.pop();
    setSelectedDays(newSelectedDays);
    setamountDays(amountDays - 1);
  };  

  const addTimeSpan = () => {
    disableErrDetection();
    const newId = lastUsedId + 1;
    setTimeSpans([...timeSelector, { id: newId, open: null, close: null }]);
    setLastUsedId(newId);
  };

  const deleteTimeSpan = (id) => {
    disableErrDetection();
    if (timeSelector.length === 1) {
      return;
    }
    const updatedBlocks = timeSelector.filter((block) => block.id !== id);
    setTimeSpans(updatedBlocks);
  };

  const setTime = (id, timeData) => {
    const updatedBlocks = timeSelector.map((block) => {
      if (block.id === id) {
        return {
          ...block,
          open: timeData.open,
          close: timeData.close,
        };
      }
      return block;
    });
    setTimeSpans(updatedBlocks);
  };

  const handleChangeDay = (dayOfWeek, type) => {
    const updatedDays = [...selectedDays]; // Create a new array
    updatedDays[type] = { day: dayOfWeek };
    setSelectedDays(updatedDays); // Update the state with the new array
  };

  //Utilizado cuando se traen datos desde un JSON
  const getDayNumber = (label) => {
    const day = daysOfWeek.find((item) => item.label === label);
    return day ? day.value : null;
  }

  //Completa los datos a devolver al componente padre
  useEffect(() => {
    const timeSpans = timeSelector.map(({ open, close }) => ({
      open,
      close,
    }));
    const returnedData = { id: params.id, days: selectedDays, multiple: !params.rangeDays, openingHours: timeSpans }
    onChange(returnedData);

  }, [selectedDays, timeSelector]);

  return (
    <div className="w-full">
      <div className="block">
        <div className="flex flex-wrap my-2 mx-2">
          {params.rangeDays ? (
            <div className="flex items-center">
              <DaysOfWeekPicker
                key={0}
                defaultDay={getDayNumber(selectedDays[0].day)}
                setDay={(e) => handleChangeDay(daysOfWeek[e].label, 0)}
              />
              <span className="mx-2">a</span>
              <DaysOfWeekPicker
                key={1}
                defaultDay={getDayNumber(selectedDays[1].day)}
                setDay={(e) => handleChangeDay(daysOfWeek[e].label, 1)}
              />
            </div>
          ) : (
            <>
              {selectedDays.map((_, index) => (
                <div className="flex items-center">
                  {index > 0 ? <>&nbsp;-&nbsp;</> : <></>}
                  <DaysOfWeekPicker
                    key={2 + index}
                    defaultDay={getDayNumber(selectedDays[index].day)}
                    setDay={(e) => handleChangeDay(daysOfWeek[e].label, index)}
                  />
                </div>
              ))}
              <button id="moreDays" onClick={addDay}
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto sm:text-sm mx-2 my-2">
                +
              </button>
              {amountDays > 1 && (
                <button id="moreDays" onClick={deleteDay}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2 my-2">
                  −
                </button>
              )}
            </>
          )}
        </div>

        {timeSelector.map((block, index) => (
          <div className="flex flex-wrap" key={block.id}>
            <TimeSpan errDetection={errDetection}
              schedule={timeSelector[index]}
              blockId={block.id}
              setTime={setTime} />
            {timeSelector.length > 1 && (
              <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2 my-2"
                onClick={() => deleteTimeSpan(block.id)}>
                x
              </button>
            )}
          </div>
        ))}
        <button onClick={addTimeSpan} className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto sm:text-sm mx-2 my-2" >
          Otro horario...
        </button>
      </div>
    </div>
  );
};

export default OpeningHours;
