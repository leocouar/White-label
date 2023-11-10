import React, { useState, useEffect } from 'react';
import Schedule from '@/components/stores/Schedule';


const TestSchedule = () => {
    //SOLO PARA TESTEO AHORA
    //Imaginemos que el back devuelve esto...
    const [scheduleData, setScheduleData] = useState();
    //0 - No devuelve datos, 1 - Devuelve un JSON, 2 - devuelve un String
    const [canSubmitData, setCanSubmitData] = useState(0);
    const [outputText, setOutputText] = useState("Testing...")
    //Se utiliza esta key solamente para forzar al componente a recargar la informacion...
    const [key, setKey] = useState(0);

    const getJSON =  () => {
        setCanSubmitData(1);
    }

    const getString = () => {
        setCanSubmitData(2);
    }

    const testWithJSON = () => {
        setScheduleData([
            {
              id: 1,
              days: [
                {
                  day: "Lunes"
                },
                {
                  day: "Miércoles"
                }
              ],
              multiple : false,
              "openingHours": [
                {
                  open: "08:00",
                  close: "12:00"
                },
                {
                  open: "14:30",
                  close: "19:30"
                }
              ]
            },
            {
              id: 2,
              days: [
                {
                  day: "Lunes"
                },
                {
                  day: "Miercoles"
                },
                {
                  day: "Viernes"
                }
              ],
              multiple : true,
              "openingHours": [
                {
                  open: "09:00",
                  close: "14:00"
                }
              ]
            },
            {
              id: 3,
              days: [
                {
                  day: "Sábado"
                }
              ],
              multiple : true,
              "openingHours": [
                {
                  open: "08:00",
                  close: "12:00"
                },
                {
                  open: "13:00",
                  close: "15:00"
                }
              ]
            },
            {
              id: 4,
              days: [
                {
                  day: "Domingo"
                }
              ],
              multiple : true,
              "openingHours": [
                {
                  open: "10:00",
                  close: "12:30"
                }
              ]
            }
          ]);
        setKey(key + 1);
    }

    //Limpia el contenido del componente
    const cleanAll = () => {
        setScheduleData([]);
        setCanSubmitData(0)
        setKey(key + 1);
    }

    //Obtiene, o un JSON, o el texto plano
    const setData = (e) => {
        if (canSubmitData === 1) {
            setScheduleData(e);
        }
        setOutputText(e);
    }

    return (
        /*HORARIOS - SOLO PARA TESTEO*/
        <div className="block justify-center md:w-1/2">
            <div className="w-full">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                    htmlFor="description">Horarios:</label>
                <Schedule key={key} 
                          canSubmitData={canSubmitData} 
                          disableDataSubmit={()=>setCanSubmitData(0)}  
                          schedule={scheduleData} 
                          onChange={(e) => setData(e)} />
            </div>
            <div className='block mt-5'>
                <button onClick={getJSON}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-auto sm:text-sm mx-2" >
                    Obtener JSON
                </button>
                <button onClick={getString}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-auto sm:text-sm mx-2" >
                    Obtener String
                </button>
                <button onClick={testWithJSON}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-auto sm:text-sm mx-2" >
                    Pasar JSON de prueba al componente
                </button>
                <button onClick={cleanAll}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-auto sm:text-sm mx-2" >
                    Limpiar
                </button>

                <div className="border border-grey h-80 overflow-scroll">
                    {canSubmitData === 1 ? JSON.stringify(scheduleData, null, 2) : ""}
                    {typeof outputText === 'string' && canSubmitData === 2 && (
                        <div className="border border-grey h-80 overflow-scroll">
                            {outputText.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TestSchedule;
