import { useState } from "react";
// custom hook se encarga de validar los formularios
export const useForm = (initialState = {}) => {
  const [values, setvalues] = useState(initialState);

  const reset = () => {
    setvalues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setvalues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleInputChangeCategory = ({ target }) => {
    setvalues({
      ...values,
      category: {
        [target.name]: target.value
      }
    });
  };

  const handleInputChangeCity = ({ target }) => {
    setvalues({
      ...values,
      city: {
        [target.name]: target.value
      }
    });
  };

  const handleFeature = (features) => {
    setvalues({
      ...values,
      feature: features
    });
  };

  const handleCancellationPolicie = (cancellationPolicy) => {
    setvalues({
      ...values,
      cancellationPolity: cancellationPolicy
    });
  };

  const handleSecurityPolicie = (securityPolicy) => {
    setvalues({
      ...values,
      securityPolicy: securityPolicy
    });
  };

  const handleNormPolicie = (normPolicies) => {
    setvalues({
      ...values,
      normPolicy: normPolicies
    });
  };

  const handleImage = (images) => {
    setvalues({
      ...values,
      images: images
    });
  };
  

  return [values, handleInputChange,
    handleInputChangeCategory,
    handleInputChangeCity, handleFeature,
    handleCancellationPolicie, handleSecurityPolicie,
    handleNormPolicie, handleImage, reset];
};
