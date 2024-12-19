// FormValidator.js
import { useEffect } from "react";

const FormValidator = ({ formData, updateValidation }) => {
  useEffect(() => {
    const emailValid = validateInput("email", formData.email.value);
    const passwordValid = validateInput("password", formData.password.value);
    updateValidation({
      ...formData,
      email: { ...formData.email, isValid: emailValid },
      password: { ...formData.password, isValid: passwordValid },
      formValid: emailValid && passwordValid,
    });
  }, [formData.email.value, formData.password.value, updateValidation]);

  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
      case "password":
        return value.length >= 8 && validatePasswordComplexity(value).allValid;
      default:
        return false;
    }
  };

  const validatePasswordComplexity = (password) => {
    const validations = {
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
      hasNumber: /[0-9]+/.test(password),
      hasUppercase: /[A-Z]+/.test(password),
      hasLowercase: /[a-z]+/.test(password),
    };
    validations.allValid = Object.values(validations).every(Boolean);
    return validations;
  };

  return null; // This component does not render anything
};

export default FormValidator;
