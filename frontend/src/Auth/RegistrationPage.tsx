import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const RegistrationPage = () => {
  //   const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setLastNameError("");
    setFirstNameError("");
    handleRegister();
  };
  const handleRegister = () => {
    apiClient
      .post("/auth/users/", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        email: emailRef.current?.value,
        first_name: firstNameRef.current?.value,
        last_name: lastNameRef.current?.value,
      })
      .then((res) => {
        console.log(res);
        setMessage("Account Successfully Created");
        // setTimeout(() => {
        //   navigate("/login");
        // }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data?.detail);
        setUsernameError(err.response.data.username?.[0]);
        setPasswordError(err.response.data.password?.[0]);
        setEmailError(err.response.data.email?.[0]);
        setLastNameError(err.response.data.first_name?.[0]);
        setFirstNameError(err.response.data.last_name?.[0]);
      });
  };

  return (
    <>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <div className="form-container">
        <form
          id="register-form"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div>
            {firstNameError && <p>{firstNameError}</p>}
            <input
              className="input"
              type="text"
              name="first name"
              placeholder="Enter First Name"
              ref={firstNameRef}
            ></input>
          </div>
          <div>
            {lastNameError && <p>{lastNameError}</p>}
            <input
              className="input"
              type="text"
              name="last name"
              placeholder="Enter Last Name"
              ref={lastNameRef}
            ></input>
          </div>
          <div>
            {emailError && <p>{emailError}</p>}
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Enter Email"
              ref={emailRef}
            ></input>
          </div>
          <div>
            {usernameError && <p>{usernameError}</p>}
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Enter Username"
              ref={usernameRef}
            ></input>
          </div>
          <div>
            {passwordError && <p>{passwordError}</p>}
            <input
              className="input"
              type="password"
              name="username"
              placeholder="Enter Password"
              ref={passwordRef}
            ></input>
          </div>
          <div className="button ">
            <button className="btn__primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
