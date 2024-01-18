const PhoneInputFields = ({telephone, setTelephone}) => {
    return <>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="telephone">Tel&eacute;fono:</label>
        <p className="text-xs text-gray-400">Podrá ser utilizado como contacto de WhatsApp</p>
        <div className="flex items-center mb-3">
            <span className="absolute text-gray-500 pl-3">+54 9</span>
            <input
                type="text"
                id="telephone"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 pl-16 pr-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Ejemplo: 2314123456"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
            />
        </div>
    </>
}

export default PhoneInputFields;