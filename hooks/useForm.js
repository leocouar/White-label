import { useState, useEffect } from "react";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useRouter } from "next/router";

const useForm = (initialState, validateForm, submitForm) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [triedToSend, setTriedToSend] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    if (triedToSend){
      setErrors(validateForm(form));
    }
  }, [form]);
  
  

  const handleSubmit = async (e) => {
    console.log("e", e)
    e.preventDefault();
    setTriedToSend(true);
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const result = await submitForm(form);
        if (result.data.hasOwnProperty("name")) {
          NotificationManager.info('El artículo: ' + '\"' + form.name + '\"' + " se cargó correctamente", 'Administración de productos', 2000);
          router.push("/products/" + result.data.id);
        } else {
          NotificationManager.info(result.status + ' No fue posible cargar el artículo: ' + '\"' + form.name + '\"', 'Administración de productos', 2000);
        }
      } catch (error) {
        NotificationManager.error('Ocurrió un error al procesar el formulario.', 'Error', 2000);
      }
      setLoading(false);
      
    } else {
      NotificationManager.info('No fue posible cargar el artículo: ' + '\"' + form.name + '\"', 'Administración de productos', 2000);
    }
  };

  return {
    form,
    setForm,
    errors,
    loading,
    response,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
