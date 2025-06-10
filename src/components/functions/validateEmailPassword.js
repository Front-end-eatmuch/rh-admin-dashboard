import * as EmailValidator from "email-validator";
var passwordValidator = require("password-validator");

var schema = new passwordValidator();

schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .is()
  .not();

const EmailValidation = (email) => {
  if (EmailValidator.validate(email)) {
    return true;
  } else {
    return false;
  }
};

const PasswordValidation = (password) => {
  if (schema.validate(password)) {
    return true;
  } else {
    return false;
  }
};

export { EmailValidation, PasswordValidation };
