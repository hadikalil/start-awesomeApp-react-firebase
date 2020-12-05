import React from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const { handleSubmit, handleChange, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            value={values.name}
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          onChange={handleChange}
          value={values.email}
            name="email"
          type="email"
          placeholder="Your email"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          value={values.password}
          name="password"
          type="password"
          placeholder="Choose a secure password"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "need to creat an account" : "already have an acount?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

// the toggel onclik on setLogin  is activated on the "need to creat an account" : "already have an acount?"
// 1. it changes the name login to create account
// 2. it changes the
