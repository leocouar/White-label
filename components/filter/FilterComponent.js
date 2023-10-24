import React, { useState, useRef, useEffect } from 'react';

const FilterComponent = ({ filterText, onFilter, onClear, columns }) => {
  const [selectedValue, setSelectedValue] = useState(columns ? columns[0] : null);
  const [inputValue, setInputValue] = useState(filterText);
  const radioRefs = useRef({});

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onFilter(e);
  };

  const limpiar = () => {
    setInputValue('');
    onClear();
  };

  const handleRadioChange = (column) => {
    setSelectedValue(column);
  };

  useEffect(() => {
    if (selectedValue) {
      radioRefs.current[selectedValue.value].checked = true;
    }
  }, [selectedValue]);

  return (
    <div id="filterComponent" className="w-full">
      <input
        className="w-full p-2 bg-gray-100 border border-purple-500 border-gray-200 rounded-lg"
        id="search"
        type="text"
        placeholder={`Buscando por: ${selectedValue ? selectedValue.name : ''}...`}
        aria-label="Search Input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="flex">
        <div id="orderBy" className="flex items-center w-9/12">
          {columns &&
            columns.map((column) => (
              <div key={column.value} className="flex items-center mr-4">
                <input
                  type="radio"
                  name="option"
                  value={column.value}
                  ref={(el) => (radioRefs.current[column.value] = el)}
                  checked={selectedValue && selectedValue.value === column.value}
                  onChange={() => handleRadioChange(column)}
                  className="mr-2"
                />
                <span>{column.name}</span>
              </div>
            ))}
        </div>
        {filterText && (
          <div className="flex justify-end w-3/12">
            <button className="text-blue-500" onClick={limpiar}>
              Limpiar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
