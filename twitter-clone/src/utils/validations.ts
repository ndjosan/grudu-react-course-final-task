import * as EmailValidator from "email-validator";

export function validateUsername(value: string) {
  return value.length >= 4 && value.length <= 256
    ? ""
    : "Username must be longer than 4 and shorter then 256 characters";
}

export function validatePassword(value: string) {
  return value.length >= 8 && value.length <= 256
    ? ""
    : "Password must be longer than 8 and shorter then 256 characters";
}

export function validateEmail(value: string) {
  return EmailValidator.validate(value) ? "" : "Please enter a valid email";
}

export function validateName(value: string) {
  return value.length >= 1 && value.length <= 512
    ? ""
    : "Full name must be longer than 1 and shorter then 512 characters";
}

export function validateTweet(text: string) {
  if (text.trim().length === 0 || text.trim().length > 140)
    return "Tweet must be between 1 and 140 characters";
  return "";
}
