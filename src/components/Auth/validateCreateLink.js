//validateCreateLink used to validate the input from the CreateLink component

export default function validateCreateLink(values) {

    let errors = {}// this is an errors object that will save into it errors.description & errors.url
        // values looks like :- {description: "", url: ""}

    // description Errors 
    if (!values.description) { // if there is no values on description input ====> errors.description = "description must be at least 10 characters"
        errors.description = "description required"
    } else if (values.description.length < 10) {
        errors.description = "description must be at least 10 characters"
    }
    // url Errors
    if (!values.url) {
        errors.url = "url required"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "url must be valid"
    }
 

    return errors;
}