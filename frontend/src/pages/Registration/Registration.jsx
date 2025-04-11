/**
 * Account Registration Page, instructs a user to register an email with a valid username and password.
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registration.css";
import axios from "axios";
import Swal from "sweetalert2";

/**
 * Function to handle the user account registration with creation of username, email, and password.
 * @returns Registration component.
 */
function Registration() {
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
    // username validation
    if (!formData.username) {
      invalid.username = "*Required field";
    } else if (formData.username.length < 1 || formData.username.length > 16) {
      invalid.username = "Username length cannot exceed 16 characters";
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
   * Event handler for registration submission.
   * - For now, this only redirects the user to login upon invokation of the "Submit" button.
   *   This is will be added to in the future once backend logic is implemented.
   * @param {*} e Button-click event.
   */
  const submissionHandler = async (e) => {
    // prevents event handling if input fields are left unsatisfied.
    e.preventDefault();
    if (validate()) {
      try {
        // Send POST request to the backend for registration
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            email: formData.email,
            username: formData.username,
            password: formData.password,
          }
        );
        if (response.status === 201) {
          // Show a success alert when registration is successful
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "You have successfully registered! You can now log in.",
          }).then(() => {
            // Navigate to the login page after the success alert
            navigate("/login");
          });
        }
      } catch (err) {
        // Handle error response from the backend using SweetAlert2
        if (err.response && err.response.data) {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: `Registration failed. Error: ${err.response.data.error}`,
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
    <div className="registrationContainer">
      <div className="registrationContent">
        <div className="registration">
          {/* <div className="regTopSpace"></div> */}
          <form onSubmit={submissionHandler}>
            <img src="/images/FraudflixLogo.png" className="regLogo"></img>
            <div className="registrationCred">
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
            <div className="registrationCred">
              <input
                type="text"
                name="username"
                placeholder="Enter your username..."
                value={formData.username}
                onChange={inputEvent}
                className={errors.username ? "error" : ""}
              />
              {errors.username && (
                <span className="response">{errors.username}</span>
              )}
            </div>
            <div className="registrationCred">
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={formData.password}
                onChange={inputEvent}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="response">{errors.password}</span>
              )}
            </div>
            <button type="submit" className="submissionButton">
              Create Account
            </button>
          </form>
          <div className="loginLink">
            <p>
              Already Have an Account?{" "}
              <Link to="/login" className="clickLogin">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Registration;
