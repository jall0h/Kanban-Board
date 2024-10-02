import { useRef, useState } from "react";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import useErrorStore from "./store";

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { errors, setUsernameError, setPasswordError } = useErrorStore();
  const navigate = useNavigate();
  const handleLogin = () => {
    if (usernameRef && passwordRef) {
      apiClient
        .post("/auth/jwt/create/", {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setUsernameError(err.response.data.username?.[0]);
          setPasswordError(err.response.data.password?.[0]);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        });
    }
  };
  return (
    <div className="container text-center mt-5">
      <Form
        formType={"login"}
        handleSubmit={() => handleLogin()}
        usernameRef={usernameRef}
        passwordRef={passwordRef}
      />
    </div>
  );
};

export default LoginPage;
