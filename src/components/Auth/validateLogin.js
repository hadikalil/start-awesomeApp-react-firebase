// Login state --> useFormValidation ------> give         validate(values)--> login state to validateLogin with values to work on 

export default function validateLogin(values) {
    let errors = {} // this is an errors object that will save into it errors.email & errors.Password
        // values looks like :- {name: "", email: "deeeee", password: "d"}

    // Email Errors 
    if (!values.email) { // if there is no values on email input ====> errors.email = "Email required"
        errors.email = "Email required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }
    // Password Errors
    if (!values.password) {
        errors.password = "Password required"
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters"
    }
    // // Name Errors
    // if (!values.name) {
    //     errors.name = "name required"
    // } else if (!/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/i.test(values.name)) {
    //     errors.name = "name must be at least 2 characters"
    // }


    return errors;
}