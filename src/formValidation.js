export const validateForm = (formState) => {
  let errors = {};

  if (!formState.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formState.password.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
};
