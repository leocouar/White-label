import { useState, useEffect } from "react";

const isClient = typeof window !== "undefined";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isClient) {
      // Si se está ejecutando en el cliente, se puede acceder a localStorage
      const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;
      setValue(storedValue);
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue) => {
    if (isClient) {
      // Si se está ejecutando en el cliente, se puede acceder a localStorage
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
