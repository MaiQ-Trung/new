import Validation from "./Validation";

export default class LoginValidation {
  constructor(email) {
    this.email = email;
  }

  checkValidations() {
    let errors = [];

    if (!Validation.validateEmail(this.email)) {
      errors["email"] = "Invalid email address";
    }
    return errors;
  }

  static getErrorMessegesFromCode(errorCode) {
    console.log(errorCode);
    switch (errorCode) {
      default:
        return "Email or password is wrong. Please try again.";
    }
  }
}
