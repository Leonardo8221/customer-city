// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};

export const validatePassword = (password?: string) => {
  if (!password) return false;
  return (
    password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[^a-zA-Z0-9]|\s|\d/.test(password)
  );
};

export const validateEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
