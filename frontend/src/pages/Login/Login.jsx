/**
 * Account Login Page, instructs a user to register an email with a valid username and password.
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";

/**
 * Function to handle the user account Login with creation of username, email, and password.
 * @returns Login component.
 */
function Login() {
  // for page navigation based on input
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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
      ...formData,
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
    // password validation
    if (!formData.password) {
      invalid.password = "*Required field";
    } else if (formData.password.length < 10 || formData.password.length > 60) {
      invalid.password =
        "Password length cannot be less than 10 characters or exceed 60 characters";
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
  const submissionHandler = async (e) => {
    // prevents event handling if input fields are left unsatisfied.
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        if (response.status === 200) {
          // Show a success alert when registration is successful
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You have successfully logged in! Enjoy the goooooooood time!",
          }).then(() => {
            localStorage.setItem("token", response.data.token);
            // Optionally store username/email if needed
            localStorage.setItem("username", response.data.user.username);
            console.log(localStorage);
            console.log(localStorage.token);
            // Navigate to the home page after the success alert
            navigate("/home");
          });
        }
      } catch (err) {
        // Handle error response from the backend using SweetAlert2
        if (err.response && err.response.data) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: `Login failed. Error: ${err.response.data.error}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Please try again later.",
          });
        }
      }
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginContent">
        <div className="login">
          {/* <div className="regTopSpace"></div> */}
          <form onSubmit={submissionHandler}>
            <img src="/images/FraudflixLogo.png" className="loginLogo"></img>
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
