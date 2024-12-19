export const validateEmail = (email) => {
  return (
    email === "" || email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null
  );
};
