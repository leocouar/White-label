import React, { useState, useEffect } from 'react';
import TimePicker from './TimePicker';

//Componente que permite determinar horarios de apertura y de cierre
const TimeSpan = ({ errDetection = false, schedule = null, blockId, setTime }) => {
  const [openTime, setOpenTime] = useState(schedule.open);
  const [closeTime, setCloseTime] = useState(schedule.close);

  const handleOpenTime = (e) => {
    setOpenTime(e);
  };

  const handleCloseTime = (e) => {
    setCloseTime(e);
  };

  useEffect(() => {
      setTime(blockId, {
        open: openTime,
        close: closeTime,
      });
  }, [blockId, openTime, closeTime]);

  return (
    <div className="flex items-center">
      <TimePicker time={openTime} errorIfEmpty={errDetection} setTime={(e) => handleOpenTime(e)} />
      <span className="inline-block text-center">&nbsp;a</span>
      <TimePicker time={closeTime} errorIfEmpty={errDetection} setTime={(e) => handleCloseTime(e)} />
    </div>
  );
};

export default TimeSpan;
