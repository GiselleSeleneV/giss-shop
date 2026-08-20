import axios from "axios";

const messageMap: Record<string, string> = {
  "Credentials are not valid (email)":
    "No existe una cuenta con este correo.",
  "Credentials are not valid (password)": "La contraseña no es correcta.",
  "User is inactive, talk with an admin":
    "Tu cuenta está inactiva. Habla con un administrador.",
  "email must be an email": "El correo no es válido.",
  "email must be a string": "El correo no es válido.",
  "password must be longer than or equal to 6 characters":
    "La contraseña debe tener al menos 6 caracteres.",
  "password must be shorter than or equal to 50 characters":
    "La contraseña no puede superar 50 caracteres.",
  "The password must have a Uppercase, lowercase letter and a number":
    "La contraseña debe incluir mayúscula, minúscula y un número o símbolo.",
  "User already exists": "Este correo ya está registrado.",
  "fullName must be a string": "El nombre no es válido.",
  "fullName must be longer than or equal to 1 characters":
    "El nombre es obligatorio.",
};

const translateMessage = (message: string): string => {
  if (messageMap[message]) return messageMap[message];
  if (message.startsWith("property ") && message.endsWith(" should not exist")) {
    return "Hay campos que no están permitidos.";
  }
  return message;
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "No se pudo completar la solicitud. Inténtalo de nuevo.";
  }

  const msg = error.response?.data?.message;

  if (Array.isArray(msg)) {
    return msg.map((item) => translateMessage(String(item))).join(". ");
  }

  if (typeof msg === "string" && msg.trim()) {
    return translateMessage(msg);
  }

  return "No se pudo completar la solicitud. Inténtalo de nuevo.";
};
