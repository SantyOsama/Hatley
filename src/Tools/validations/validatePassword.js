export const validatePassword = (value) => {
  return (
    value === "" || (value.length >= 8 && validatePasswordComplexity(value))
  );
};

const validatePasswordComplexity = (value) => {
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);
  const hasNumber = /[0-9]+/.test(value);
  const hasUppercase = /[A-Z]+/.test(value);
  const hasLowercase = /[a-z]+/.test(value);
  return hasSpecialChar && hasNumber && hasUppercase && hasLowercase;
};

export const validateSpecialChar = (value) => {
  return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);
};

export const validateNumber = (value) => {
  return /[0-9]+/.test(value);
};

export const validateUppercase = (value) => {
  return /[A-Z]+/.test(value);
};

export const validateLowercase = (value) => {
  return /[a-z]+/.test(value);
};
