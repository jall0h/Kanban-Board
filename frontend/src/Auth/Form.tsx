import { useRef, useState } from "react";
import useErrorStore from "./store";

interface Props {
  formType: "login" | "register";
  handleSubmit: () => void;
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  emailRef?: React.RefObject<HTMLInputElement>;
  firstNameRef?: React.RefObject<HTMLInputElement>;
  lastNameRef?: React.RefObject<HTMLInputElement>;
}

const Form = ({
  formType,
  handleSubmit,
  usernameRef,
  passwordRef,
  firstNameRef,
  lastNameRef,
  emailRef,
}: Props) => {
  const title = formType == "login" ? "Login" : "Register";
  const errors = useErrorStore((s) => s.errors);
  return (
    <>
      <h1>{title}</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {title == "Register" && (
          <>
            <div>
              {errors.firstNameError && <p>{errors.firstNameError}</p>}
              <input
                className="input"
                type="text"
                name="first name"
                placeholder="Enter First Name"
                ref={firstNameRef}
              ></input>
            </div>
            <div>
              {errors.lastNameError && <p>{errors.lastNameError}</p>}
              <input
                className="input"
                type="text"
                name="last name"
                placeholder="Enter Last Name"
                ref={lastNameRef}
              ></input>
            </div>
            <div>
              {errors.emailError && <p>{errors.emailError}</p>}
              <input
                className="input"
                type="text"
                name="email"
                placeholder="Enter Email"
                ref={emailRef}
              ></input>
            </div>
          </>
        )}
        <div>
          {errors.usernameError && <p>{errors.usernameError}</p>}
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Enter Username"
            ref={usernameRef}
          ></input>
        </div>
        <div>
          {errors.passwordError && <p>{errors.passwordError}</p>}
          <input
            className="input"
            type="password"
            name="username"
            placeholder="Enter Password"
            ref={passwordRef}
          ></input>
        </div>
        <div className="button ">
          <button className="btn btn-primary" type="submit">
            {title}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
