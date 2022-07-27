/**
 * RULE:
 * Minimum 8 characters
 * 1 capital letter
 * 1 small letter
 * 1 number
 * 1 special character upto maximum of 256
 */
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,256}$/;
