import { useState } from "react";
// custom hook se encarga de validar los formularios
export const useForm = (initialState = {}) => {
  const [values, setvalues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setvalues({
      ...values,
      [target.name]: target.value,
    });
  };
  

  return [values, handleInputChange,
    setvalues];
};
