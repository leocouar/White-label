import React, { useState, useEffect, createRef, useLayoutEffect } from 'react';

//Componente para ingresar un horario escribiendo o mediante un selector
const TimeInput = ({ time=null, errorIfEmpty = false, setTime }) => {
    const [hours, setHours] = useState(time ? time.split(':')[0] : "");
    const [minutes, setMinutes] = useState(time ? time.split(':')[1] : "");
    const [showHourSelect, setShowHourSelect] = useState(false);
    const [showMinuteSelect, setShowMinuteSelect] = useState(false);
    const hSelRef = createRef();
    const mSelRef = createRef();

    //Retorna null si alguno de los dos inputs (minutos u horas) esta vacio
    useEffect(() => {
        if (hours !== '' && minutes !== '') {
            const deliveredHour = hours.toString().padStart(2, '0');
            const deliveredMinutes = minutes.toString().padStart(2, '0');
            setTime(deliveredHour + ':' + deliveredMinutes);
        } else {
            setTime(null);
        }
    }, [hours, minutes]);

    //Configura el valor de "hours" desde el text input
    const handleHoursChange = (e) => {
        const value = e.target.value;
        if (/^$|^[0-1]?[0-9]$|^2[0-3]$/.test(value)) {
            setHours(value);
        }
    };

    //Configura el valor de "minutes" desde el text input
    const handleMinutesChange = (e) => {
        const value = e.target.value;
        if (/^$|^[0-5]?[0-9]$/.test(value)) {
            setMinutes(value);
        }
    };

    //Muestra u oculta el selector de hora
    const handleHourButtonClick = () => {
        setTimeout(() => {
            setShowHourSelect(!showHourSelect);
            setShowMinuteSelect(false);
        }, 150);
    };
    useLayoutEffect(() => {
        if (showHourSelect === true) hSelRef.current.focus();
    }, [showHourSelect, hSelRef]);

    //Muestra u oculta el selector de minutos
    const handleMinuteButtonClick = () => {
        setTimeout(() => {
            setShowMinuteSelect(!showMinuteSelect);
            setShowHourSelect(false);
        }, 150);
    };
    useLayoutEffect(() => {
        if (showMinuteSelect === true) mSelRef.current.focus();
    }, [showMinuteSelect, mSelRef]);

    //Configura el valor de "hours" desde el selector
    const handleHourSelect = (value) => {
        setHours(value);
        setShowHourSelect(false);
    };

    //Configura el valor de "minutes" desde el text input
    const handleMinuteSelect = (value) => {
        setMinutes(value);
        setShowMinuteSelect(false);

    };

    return (
        <div>
            <div className='flex flex-nowrap items-center'>
                {
                    Array.from({ length: 3 }, (_, i) => i).map((j) => {
                        const index = j;
                        const timer = (j !== 1) ?
                            <div className="w-16" key={j}>
                                <input type="text" value={j == 0 ? hours : minutes}
                                    onChange={j == 0 ? handleHoursChange : handleMinutesChange}
                                    placeholder={j == 0 ? "HH" : "MM"}
                                    maxLength="2"
                                    className={
                                        errorIfEmpty && (index == 0 && hours == "" || index == 2 && minutes == "") ?
                                            "p-2 rounded-md border-4 border-red-500 w-10 ml-2 mr-1"
                                            :
                                            "p-2 rounded-md border border-grey-300 w-10 ml-2 mr-1"
                                    } />
                                <button onClick={j === 0 ? handleHourButtonClick : handleMinuteButtonClick}
                                    className="text-xs">
                                    {'\u25BC'}
                                </button>
                                {(index == 0 && showHourSelect || index == 2 && showMinuteSelect) && (
                                    <div id={j === 0 ? "hSelector" : "mSelector"}
                                        tabindex={0}
                                        ref={j === 0 ? hSelRef : mSelRef}
                                        onBlur={j === 0 ? handleHourButtonClick : handleMinuteButtonClick}
                                        className=" absolute mt-2 ml-3 block rounded scrollbar-thin bg-white w-8 h-44 overflow-y-scroll">
                                        {j == 0 ? (
                                            Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                                                const hourFromSix = hour <= 17 ? hour + 6 : hour - 18;
                                                return (
                                                    <button key={hour} onClick={() => handleHourSelect(hourFromSix.toString().padStart(2, '0'))}>
                                                        {hourFromSix.toString().padStart(2, '0')}
                                                    </button>
                                                )
                                            })
                                        ) : (
                                            Array.from({ length: 12 }, (_, i) => i).map((minute) => {
                                                const minByFive = (minute * 5);
                                                return (
                                                    <button key={minute} onClick={() => handleMinuteSelect(minByFive.toString().padStart(2, '0'))}>
                                                        {minByFive.toString().padStart(2, '0')}
                                                    </button>
                                                )
                                            })
                                        )}
                                    </div>
                                )}
                            </div>
                            :
                            <span>&nbsp;:</span>
                        return timer;
                    })
                }
            </div>
        </div >
    );
};

export default TimeInput;
