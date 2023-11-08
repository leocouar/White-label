import React, { useState, useEffect } from 'react';
import TimePicker from './TimePicker';

//Componente que permite determinar horarios de apertura y de cierre
const TimeSpan = ({ checkErrors = false, blockId, setTime }) => {
  const [openTime, setOpenTime] = useState(null);
  const [closeTime, setCloseTime] = useState(null);

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
      <TimePicker errorIfEmpty={checkErrors} setTime={(e) => handleOpenTime(e)} />
      <span className="inline-block text-center">&nbsp;a</span>
      <TimePicker errorIfEmpty={checkErrors} setTime={(e) => handleCloseTime(e)} />
    </div>
  );
};

export default TimeSpan;
