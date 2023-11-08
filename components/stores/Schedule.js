import React, { useState, useEffect } from 'react';
import DaysOfWeekSelect from './DaysOfWeekSelect';
import TimeSpan from './TimeSpan';
import { daysOfWeek } from './DaysOfWeekSelect';

//Componente que permite determinar una serie de horarios para un dia o rango de dias
const Schedule = ( {params, canSubmitData, onScheduleChange} ) => {
  const [selectedDays, setSelectedDays] = useState(params.rangeDays ?[{day: "Lunes"}, {day: "Viernes"}] : [{day: "Sabado"}]);
  const [timeSelectorBlocks, setTimeSpans] = useState([{ id: 1, open: null, close: null }]);
  const [lastUsedId, setLastUsedId] = useState(1);

  const addTimeSpan = () => {
    const newId = lastUsedId + 1;
    setTimeSpans([...timeSelectorBlocks, { id: newId, open: null, close: null }]);
    setLastUsedId(newId);
  };  

  const deleteFunction = (id) => {
    if (timeSelectorBlocks.length === 1) {
      return;
    }
    const updatedBlocks = timeSelectorBlocks.filter((block) => block.id !== id);
    setTimeSpans(updatedBlocks);
  };

  const setTime = (id, timeData) => {
    const updatedBlocks = timeSelectorBlocks.map((block) => {
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
  
  //Completa los datos a devolver al componente padre
  useEffect(() => {
    const timeSpans = timeSelectorBlocks.map(({ open, close }) => ({
      open,
      close,
    }));
    const returnedData = { id:params.id, days: selectedDays, openingHours: timeSpans }
    onScheduleChange(returnedData);
    
  }, [selectedDays, timeSelectorBlocks]);

  return (
    <div className="w-full">
      <div className="block">
        <div className="flex  my-2 mx-2">
          {params.rangeDays ? (
            <div className="flex items-center">
              <DaysOfWeekSelect defaultDay={1} setDay={(e) => handleChangeDay(daysOfWeek[e].label, 0)} />
              <span className="mx-2">a</span>
              <DaysOfWeekSelect defaultDay={5} setDay={(e) => handleChangeDay(daysOfWeek[e].label, 1)} />
            </div>
          ) : (
            <DaysOfWeekSelect defaultDay={6} setDay={(e) => handleChangeDay(daysOfWeek[e].label, 0)} />
          )}
        </div>
        {timeSelectorBlocks.map((block) => (
          <div className="flex wrap" key={block.id}>
            <TimeSpan checkErrors={canSubmitData} blockId={block.id} setTime={setTime} />
            {timeSelectorBlocks.length > 1 && (
              <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2 my-2" onClick={() => deleteFunction(block.id)}>x</button>
            )}
          </div>
        ))}
        <button onClick={addTimeSpan} className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto sm:text-sm mx-2 my-2" >Otro horario...</button>
      </div>
    </div>
  );
};

export default Schedule;
