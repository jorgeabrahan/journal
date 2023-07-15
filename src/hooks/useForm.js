import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm)
  const [fieldsErrors, setFieldsErrors] = useState({})

  useEffect(() => {
    createValidators()
  }, [formState])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(fieldsErrors)) {
      if (fieldsErrors[formValue] !== null) return false
    }
    return true
  }, [fieldsErrors])

  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const createValidators = () => {
    const errors = {}
    for (const formField of Object.keys(formValidations)) {
      const [validatorFn, errorMessage = 'Error while validating'] = formValidations[formField]
      errors[`${formField}Error`] = validatorFn(formState[formField]) ? null : errorMessage
    }
    setFieldsErrors(errors)
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    ...fieldsErrors,
    isFormValid,
    formState,
    onInputChange,
    onResetForm
  }
}
