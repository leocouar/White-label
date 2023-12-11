import { useState } from "react";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useRouter } from "next/router";

const useForm = (initialState, validateForm, submitForm) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // const handleBlur = (e) => {
  //   handleChange(e);
  //   setErrors(validateForm(form));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const result = await submitForm(form);
        if (result.data.hasOwnProperty("name")) {
          NotificationManager.info('El artículo: ' + '\"' + form.name + '\"' + " se cargó correctamente", 'Administración de productos', 2000);
          router.push(`/products`);
        } else {
          NotificationManager.info(result.status + ' No fue posible cargar el artículo: ' + '\"' + form.name + '\"', 'Administración de productos', 2000);
        }
      } catch (error) {
        NotificationManager.error('Ocurrió un error al procesar el formulario.', 'Error', 2000);
      } finally {
        setLoading(false);
      }
    } else {
      NotificationManager.info('No fue posible cargar el artículo: ' + '\"' + form.name + '\"', 'Administración de productos', 2000);
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    // handleBlur,
    handleSubmit,
  };
};

export default useForm;
