import React, { useState, useEffect, useCallback } from 'react';
import Schedule from '@/components/stores/Schedule';

//Componente que permite establecer una agenda de horarios de trabajo para un negocio.
const BusinessHours = ({canSubmitData = false, onScheduleChange}) => {
    const [schedules, setSchedules] = useState([{ id: 1, rangeDays: true }]);
    const [schedulesData, setSchedulesData] = useState([]);
    const [lastUsedId, setLastUsedId] = useState(1);

    const handleAdd = (type) => {
        const newId = lastUsedId + 1;
        setSchedules(prevSchedules => [...prevSchedules, { id: newId, rangeDays: type }]);
        setLastUsedId(newId);
    };

    const handleDelete = (id) => {
        if (schedules.length > 1) {
            const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
            setSchedules(updatedSchedules);
            setSchedulesData((prevSchedulesData) => prevSchedulesData.filter((data) => data.id !== id));
        }
    };

    const addRange = useCallback(() => {
        handleAdd(true);
    }, [handleAdd]);

    const addDay = useCallback(() => {
        handleAdd(false);
    }, [handleAdd]);

    const manageSchedulesData = (data) => {
        const existingIndex = schedulesData.findIndex((item) =>
            item.id === data.id
        );

        if (existingIndex !== -1) {
            let updatedSchedulesData = [...schedulesData];
            updatedSchedulesData[existingIndex] = data;
            setSchedulesData(updatedSchedulesData);
        } else {
            setSchedulesData((prevSchedulesData) => [...prevSchedulesData, data]);
        }
    };

    useEffect(() => {
        //if (canSubmitData){ //Evita que se prepare una y otra vez los datos antes de estar listos.
            let validData = true;
            let businessSchedule = "";
            schedulesData.map((schedule, index) => {
                businessSchedule += schedule.days[0].day;
                if (schedule.days[1])
                    businessSchedule += (" a " + schedule.days[1].day);
                businessSchedule += '\n';
                schedulesData[index].openingHours.map((hour, index) => {
                    if (hour.open === null || hour.close === null) validData = false;
                    businessSchedule += (hour.open + " a " + hour.close + "\n")
                })
            });
            validData ?
                console.log(businessSchedule)
                :
                console.log(null);
        //}
    }, [schedulesData])

    return (
        <div>
            {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center border border-gray-400 rounded">
                    <Schedule params={schedule} canSubmitData={canSubmitData} onScheduleChange={(e) => manageSchedulesData(e)} />
                    {schedules.length > 1 && (
                        <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2 my-2"  onClick={() => handleDelete(schedule.id)}>X</button>
                    )}
                </div>
            ))}
            <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2" onClick={addRange}>+ Rango</button>
            <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm" onClick={addDay}>+ Dia</button>
        </div>
    );
};

export default BusinessHours;
