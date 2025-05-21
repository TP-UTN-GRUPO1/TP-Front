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

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (result.error) return res.status(400).send({ message: result.error });
};

const validateLoginUser = (req) => {
  const result = {
    error: false,
    message: "",
  };
  const { email, password } = req;
  if (!email || !validateEmail(email))
    return {
      error: true,
      message: "Mail invalido",
    };
  else if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña invalida",
    };
  }
  return result;
};
