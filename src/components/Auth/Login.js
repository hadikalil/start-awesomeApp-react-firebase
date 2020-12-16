import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  // to display the error masseges we need a  state
  const [firebaseError, setFirebaseError] = React.useState(null);

  // authenticateUser IS going to call either the logging method or the register method of out firebase instance
  // to determine which to call we're going to take the value of log in  and we'll use a ternayoperator

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/"); // this takes us to the desired route
    } catch (err) {
      console.error("Authentication Error ", err);
      setFirebaseError(err.message);
    }
  }

  // before adding tracking user sessions with useAuth Hook
  // async function authenticateUser() {

  //   const { name, email, password } = values
  //   try {
  //     login
  //     ? await firebase.login(email, password)
  //     : await firebase.register(name, email, password);
  //   } catch (err) {
  //     console.error('Authentication Error ',err);
  //     setFirebaseError(err.message)
  //   }
  // }

  // before the use of try and catch/ before error handling :*
  //**********************************
  // async function authenticateUser() {
  //   const { name, email, password } = values
  //   const response = login
  //       ? await firebase.login(email, password)
  //       : await firebase.register(name, email, password);
  //     console.log({response});
  // }
  //*************************************

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
          onBlur={handleBlur}
          value={values.email}
          name="email"
          type="email"
          className={errors.email && "error-input"}
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          name="password"
          type="password"
          className={errors.password && "error-input"}
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
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
