import React from "react";
import { FirebaseContext } from "../../firebase";

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
  // to get access to Firebase and the currently logged in user with context 
  const  { firebase, user } = React.useContext(FirebaseContext)

  //to get the validation first we need to pass the INITIAL_STATE and then the validation  function ----> validation function improted from @/Auth/validateCreateLink
  //last thing we need to provide to our hook before we get the values out of it is a authenticate function from the handleCreateLink that will do next step i think 
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push('/login')
    }else {
      const  { url, description } = values // first we need to get from the values state object the url and the description that hte user typed 
   
      const newLink = {  // newLink is going to consist of the stuff we need  as :
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        votes: [],
        comments: [],
        created: Date.now()
      }
      firebase.db().collection('links').add(newLink)// to creat this new link at the firebase.db // collection method is going to create a new collection if we don't have one with the name that we provide as a string 
      props.history.push('/')
    }
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
        type="url"
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
