import { useCallback, useState } from 'react';

//хук управления формой
function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const formatDateToServer = (date) => {
      const [day, month, year ] = date.split('-');
      return `${day}-${month}-${year}`;
    };

    const formatDateToInput = useCallback((date) => {
      if (!date) return '';
      const [day, month, year] = date.split('-');
      return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year.padStart(4, "0")}`;
    }, []);

      const handleChange = (event) => {
        const {target} = event;
        let {name, value} = target;

        // Переформатирование даты при изменении
        if (name === 'date_of_birth') value = formatDateToInput(value);

        // Определите, как обновить состояние values – должны мы обновлять поля messenger или нет
        if (name === 'msngr_phone' || name === 'msngr_username') {
            // Обновим объект messenger, расширив его предыдущим состоянием
            setValues({
              ...values,
              messenger: {
                ...values.messenger,
                [name]: value
              }
            });
        } else {
            // Если поле не относится к messenger, обновляем как обычно
            setValues({ ...values, [name]: value });
        }
        // Обновляем ошибки и валидацию формы
        setErrors({ ...errors, [name]: target.validationMessage });
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
      resetForm,
      formatDateToServer, 
      formatDateToInput };
}

export default useFormValidation;