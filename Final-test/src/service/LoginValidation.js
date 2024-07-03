import Validation from "./Validation";

export default class LoginValidation {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  checkValidations() {
    let errors = [];

    if (!Validation.validateEmail(this.email)) {
      errors["email"] = "Invalid email address";
    }

    if (Validation.minLength(this.password, 6)) {
      errors["password"] = "Password must be at least 6 characters";
    }

    return errors;
  }

  static getErrorMessegesFromCode(errorCode) {
    console.log(errorCode);
    switch (errorCode) {
      case "EMAIL_EXISTS":
        return "Email already exists";
      case "INVALID_LOGIN_CREDENTIALS":
        return "Email or password wrong";
      case "USER_DISABLED":
        return "The user account has been disabled by an administrator";
      default:
        return "An error occurred. Please try again later.";
    }
  }
}
