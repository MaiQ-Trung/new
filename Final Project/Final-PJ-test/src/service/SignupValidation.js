import Validation from "./Validation";

export default class SignupValidation {
  constructor(email, existingEmails) {
    this.email = email;
    this.existingEmails = existingEmails;
  }

  checkValidations() {
    let errors = [];

    if (!Validation.validateEmail(this.email)) {
      errors["email"] = "Invalid email address";
    }

    if (this.existingEmails.includes(this.email)) {
      errors["email"] = "Email already exists. Please use a different email.";
    }

    return errors;
  }

  static getErrorMessagesFromCode(errorCode) {
    console.log(errorCode);
    switch (errorCode) {
      case "email_exists":
        return "Email is already registered. Please use a different one.";
      default:
        return "đâ";
    }
  }
}
