import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import Form from "./Form";
import useErrorStore from "./store";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const {
    errors,
    setUsernameError,
    setPasswordError,
    setEmailError,
    setFirstNameError,
    setLastNameError,
    resetErrors,
  } = useErrorStore();

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
        resetErrors();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setUsernameError(err.response.data.username?.[0]);
        setPasswordError(err.response.data.password?.[0]);
        setEmailError(err.response.data.email?.[0]);
        setLastNameError(err.response.data.last_name?.[0]);
        setFirstNameError(err.response.data.first_name?.[0]);
      });
  };

  return (
    <>
      <div className="container text-center mt-5">
        <Form
          formType={"register"}
          handleSubmit={() => handleRegister()}
          usernameRef={usernameRef}
          passwordRef={passwordRef}
          emailRef={emailRef}
          firstNameRef={firstNameRef}
          lastNameRef={lastNameRef}
        />
      </div>
    </>
  );
};

export default RegistrationPage;
