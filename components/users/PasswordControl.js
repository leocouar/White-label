import React, { useState, useEffect } from "react";

export const PasswordManagement = ({ passwrdControl, setPasswrdControl, onChange, onBlur, errPass, errFormatPass, errRepPass, errMismatch, handleChangePass }) => {
    return (
        <div className="flex  flex-wrap -mx-3 mb-6">
            <div className="w-full  md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password">
                    Contraseña*
                </label>
                <input
                    autocomplete="off"
                    onChange={(e)=> onChange(setPasswrdControl, e)}
                    onBlur={onBlur}
                    value={passwrdControl.new}
                    name={"new"}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="password"
                    placeholder="Ingrese una contraseña"
                />
                {errPass && <p className="text-red-500 text-xs italic">
                    Ingrese una contraseña.
                </p>}
                {errFormatPass && <p className="text-red-500 text-xs italic">
                    Error: la contraseña no respeta las condiciones indicadas.
                </p>}
                {errMismatch && <p className="text-red-500 text-xs italic">
                    Las contraseñas no coinciden.
                </p>}
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password">
                    Repita su contraseña*
                </label>
                <input
                    autocomplete="off"
                    onChange={(e)=> onChange(setPasswrdControl, e)}
                    onBlur={onBlur}
                    value={passwrdControl.repeat}
                    name={"repeat"}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="password"
                    placeholder="Repita su contraseña"
                />
                {errRepPass && <p className="text-red-500 text-xs italic">
                    Repita su contraseña aqui por favor.
                </p>}
            </div>
            <p className={`text-blue-500 text-xs italic mt-1 px-3`}>
                8 a 16 caracteres al menos 1 mayúscula y 1 dígito
            </p>
        </div>
    );
};

export const handleChangePass = async ( setPasswrdControl, e) => {
    await setPasswrdControl((prevPasswrdControl) => ({
        ...prevPasswrdControl,
        [e.target.name]: e.target.value,
    }));
};
