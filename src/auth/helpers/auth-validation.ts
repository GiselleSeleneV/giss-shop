export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/** Same pattern as Teslo/NestJS login-user.dto: upper, lower, and a digit or special char. */
export const PASSWORD_COMPLEXITY_REGEX =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  numberOrSpecial: boolean;
}

export const isEmailValid = (email: string): boolean =>
  EMAIL_REGEX.test(email.trim());

export const isFullNameValid = (fullName: string): boolean =>
  fullName.trim().length >= 2;

export const getPasswordChecks = (password: string): PasswordChecks => ({
  length: password.length >= 6,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  numberOrSpecial: /\d/.test(password) || /\W/.test(password),
});

export const isPasswordValid = (password: string): boolean => {
  const checks = getPasswordChecks(password);
  return (
    Object.values(checks).every(Boolean) &&
    PASSWORD_COMPLEXITY_REGEX.test(password)
  );
};

export const passwordRequirementItems: {
  key: keyof PasswordChecks;
  label: string;
  shortLabel: string;
}[] = [
  {
    key: "length",
    label: "Al menos 6 caracteres",
    shortLabel: "6+",
  },
  { key: "uppercase", label: "Una letra mayúscula", shortLabel: "Mayúscula" },
  { key: "lowercase", label: "Una letra minúscula", shortLabel: "Minúscula" },
  {
    key: "numberOrSpecial",
    label: "Un número o carácter especial",
    shortLabel: "Nº / símbolo",
  },
];
