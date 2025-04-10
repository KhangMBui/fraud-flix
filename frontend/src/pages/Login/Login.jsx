/**
 * Account Login Page, instructs a user to register an email with a valid username and password.
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

/**
 * Function to handle the user account Login with creation of username, email, and password.
 * @returns Login component.
 */
function Login() {
  // for page navigation based on input
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  /**
   * Event handler for each input field.
   * @param {*} e Input event.
   */
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData({
      formData,
      [name]: value,
    });
  };

  /**
   * Validation handler for input.
   * @returns true if the input is valid.
   */
  const validate = () => {
    const invalid = {};
    // email validation
    if (!formData.email) {
      invalid.email = "*Required field";
      // check for email format
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      invalid.email = "Invalid entry";
    }
    // username validation
    if (!formData.username) {
      invalid.username = "*Required field";
    } else if (formData.username.length < 1 || formData.username.length > 16) {
      invalid.username = "Username length cannot exceed 16 characters";
    }
    // password validation
    if (!formData.password) {
      invalid.password = "*Required field";
    } else if (formData.password.length < 12 || formData.password.length > 60) {
      invalid.password =
        "Password length cannot be less than 12 characters or exceed 60 characters";
    }
    setErrors(invalid);
    return Object.keys(invalid).length === 0;
  };

  /**
   * Event handler for Login submission.
   * - For now, this only redirects the user to login upon invokation of the "Submit" button.
   *   This is will be added to in the future once backend logic is implemented.
   * @param {*} e Button-click event.
   */
  const submissionHandler = (e) => {
    // prevents event handling if input fields are left unsatisfied.
    e.preventDefault();
    if (validate()) {
      navigate("/login");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginContent">
        <div className="login">
          {/* <div className="regTopSpace"></div> */}
          <form onSubmit={submissionHandler}>
            <img src="/images/FraudflixLogo.png" className="regLogo"></img>
            <div className="loginCred">
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={inputEvent}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="response">{errors.email}</span>}
            </div>
            <div className="loginCred">
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={formData.username}
                onChange={inputEvent}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="response">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="submissionButton">
              Login
            </button>
          </form>
          <div className="loginLink">
            <p>
              Don't Have an Account?{" "}
              <Link to="./../Registration/" className="clickLogin">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
