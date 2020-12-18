import React from "react";
// we want to do validation the the form so we need to input the useFormValidation and use what we want from it
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";

// to do the validation first we need initial state so we need to creat an objet above our component
// in the form we used the input name proprty to  description & url

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  //to get the validation first we need to pass the INITIAL_STATE and then the validation  function ----> validation function improted from @/Auth/validateCreateLink
  //last thing we need to provide to our hook before we get the values out of it is a authenticate function from the handleCreateLink that will do next step i think 
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    console.log("link created!");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        onChange={handleChange}
        name="description"
        value={values.description}
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        onChange={handleChange}
        value={values.url}
        name="url"
        placeholder="the URL for the link"
        autoComplete="off"
        type="text"
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
