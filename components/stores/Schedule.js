import React, { useState, useEffect, useCallback } from 'react';
import OpeningHours from '@/components/stores/OpeningHours';

//Componente que permite establecer una agenda de horarios de trabajo para un negocio.
const Schedule = ({ canSubmitData = 0, disableDataSubmit, schedule = [], onChange }) => {
    const [errDetection, setErrDetection] = useState(false)
    const [openingHours, setOpeningHours] = useState(() => {
        if (schedule.length === 0) {
            return [{ id: 1, rangeDays: true }];
        } else {
            return schedule.map((item, index) => ({
                id: index + 1,
                rangeDays: item.days.length > 1 ? true : false
            }));
        }
    });

    const [schedulesData, setSchedulesData] = useState(schedule);
    const [lastUsedId, setLastUsedId] = useState(schedule.length === 0 ? 1 : schedule.length);

    const handleAdd = (type) => {
        const newId = lastUsedId + 1;
        setOpeningHours(prevOpeningHours => [...prevOpeningHours, { id: newId, rangeDays: type }]);
        setLastUsedId(newId);
    };

    const handleDelete = (id) => {
        if (openingHours.length > 1) {
            const updatedOpeningHours = openingHours.filter((schedule) => schedule.id !== id);
            setOpeningHours(updatedOpeningHours);
            setSchedulesData((prevOpeningHoursData) => prevOpeningHoursData.filter((data) => data.id !== id));
        }
    };

    const addRange = useCallback(() => {
        disableErrDetection();
        setErrDetection(false);
        handleAdd(true);
    }, [handleAdd]);

    const addDay = useCallback(() => {
        disableErrDetection();
        setErrDetection(false);
        handleAdd(false);
    }, [handleAdd]);

    const manageOpeningHoursData = (data) => {
        const existingIndex = schedulesData.findIndex((item) =>
            item.id === data.id
        );

        if (existingIndex !== -1) {
            let updatedOpeningHoursData = [...schedulesData];
            updatedOpeningHoursData[existingIndex] = data;
            setSchedulesData(updatedOpeningHoursData);
        } else {
            setSchedulesData((prevOpeningHoursData) => [...prevOpeningHoursData, data]);
        }
    };

    useEffect(() => {
        //Se devuelven los datos al componente padre como un JSON
        if (canSubmitData == 1) {
            onChange(schedulesData);
        }
        //Se devuelven los datos al componente padre como un String
        else if (canSubmitData == 2) {
            onChange(plainSchedule(schedulesData))
        }
    }, [schedulesData, canSubmitData])

    //Si se necesita conseguir los datos, se marcan los campos vacios en rojo...
    useEffect(() => {
        if (canSubmitData === 1 || canSubmitData === 2) {
            setErrDetection(true);
        }
    }, [canSubmitData]);


    const disableErrDetection = () => {
        disableDataSubmit();
        setErrDetection(false);
    }



    return (
        <div>
            {openingHours.map((schedule, index) => (
                <div key={schedule.id} className="flex items-center border border-gray-400 rounded">
                    <OpeningHours params={schedule}
                        openingHours={schedulesData[index]}
                        disableErrDetection={disableErrDetection}
                        errDetection={errDetection}
                        onChange={(e) => manageOpeningHoursData(e)} />
                    {openingHours.length > 1 && (
                        <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2 my-2" onClick={() => handleDelete(schedule.id)}>X</button>
                    )}
                </div>
            ))}
            <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto sm:text-sm mx-2"
                onClick={addRange}>+ Rango</button>
            <button className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                onClick={addDay}>+ Dia</button>
        </div>
    );
};

export default Schedule;

//Exportable: si se necesita para convertir un JSON sin el componente
export const plainSchedule = (schedulesData) => {
    let validData = true;
    let scheduleOutput = "";
    schedulesData.map((schedule, index) => {
        scheduleOutput += schedule.days[0].day;
        if (schedule.days[1])
            scheduleOutput += (" a " + schedule.days[1].day);
        scheduleOutput += '\n';
        schedulesData[index].openingHours.map((hour, index) => {
            if (hour.open === null || hour.close === null) validData = false;
            scheduleOutput += (hour.open + " a " + hour.close + "\n")
        })
    });

    return (
        validData ?
            (scheduleOutput)
            :
            (""));
}