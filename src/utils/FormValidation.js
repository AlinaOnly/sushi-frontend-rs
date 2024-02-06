import { useCallback, useState } from 'react';

//хук управления формой
function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // Функция преобразования формата даты в формат, ожидаемый сервером
    const formatDate = (value) => {
        const dateValue = new Date(value);
        const day = `0${dateValue.getDate()}`.slice(-2);
        const month = `0${dateValue.getMonth() + 1}`.slice(-2);
        const year = dateValue.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Для поля date_of_birth применяем специальное преобразование
        const isBirthDate = name === "date_of_birth";
        const newValue = isBirthDate ? formatDate(value) : value;

        setValues({...values, [name]: newValue});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
          setValues(newValues);
          setErrors(newErrors);
          setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
      );

    return { 
        values,
        setValues,
        handleChange,
        errors,
        isValid,
        resetForm };
}

export default useFormValidation;