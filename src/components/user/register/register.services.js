export const validateString = (str, minLength, maxLength) => {
  if (minLength && str.length < minLength) return false;
  else if (maxLength && str.length > maxLength) return false;

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password,
  minLength,
  maxLength,
  needsUpperCase,
  needsNumber,
  needsSpecialChar
) => {
  if (minLength && password.length < minLength) return false;
  else if (maxLength && password.length > maxLength) return false;
  else if (needsUpperCase && !/[A-Z]/.test(password)) return false;
  else if (needsNumber && !/\d/.test(password)) return false;
  else if (needsSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false;

  return true;
};

export const isOverMinimumAge = (birthDate, minAge) => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  return (
    age > minAge ||
    (age === minAge && m >= 0 && today.getDate() >= birth.getDate())
  );
};
