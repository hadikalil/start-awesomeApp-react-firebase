import React from "react";

function useFormValidation(initialState, validate) {
    const [values, setValues] = React.useState(initialState)
    const [errors, setErrors] = React.useState({})
    const [isSubmitting, setSubmitting] = React.useState(false)

    React.useEffect(() => {

        if (isSubmitting) {
            // to see if there is errors well pass the obj to Object.keys to turn it into array 
            const noErrors = Object.keys(errors).length === 0
            if (noErrors) { // if no errors we want to authenticate the user 
                console.log('authenticated', values);
                // then we want to set set submitting to false 
                setSubmitting(false)
            } else {
                setSubmitting(false)
            }
        }
    }, [errors])

    function handleChange(event) {
        event.persist();
        setValues(previousValues => ({
            ...previousValues,
            [event.target.name]: event.target.value
        }))

    }

    function handleBlur() {
        const validationErrors = validate(values)
        setErrors(validationErrors)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const validationErrors = validate(values)
        setErrors(validationErrors)
        setSubmitting(true)
        console.log({ values });
    }

    return { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation;