import { useRef, useState } from "react";
import apiClient from "../services/apiClient";

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data?.detail);
          setUsernameError(err.response.data.username?.[0]);
          setPasswordError(err.response.data.password?.[0]);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        });
    }
  };
  return (
    <div className="container text-center mt-5">
      {error && <p>{error}</p>}
      <div className="row ">
        <div className="col-12 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {usernameError && <p>{usernameError}</p>}
            <div className="input-group  col-auto mb-3">
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="form-control"
                ref={usernameRef}
              />
            </div>
            {passwordError && <p>{passwordError}</p>}
            <div className="input-group mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                ref={passwordRef}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
