import { useCallback, useState, useRef, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//хук управления формой
function useFormValidation() {

    const currentUser = useContext(CurrentUserContext);

    const [values, setValues] = useState({
      isAddressValid: false,
      messenger_account: {
        msngr_type: '',
        msngr_username: '',
      },
      //currentPassword: currentUser.password || '',
      //newEmail: currentUser.email || ''
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const formRef = useRef();

    useEffect(() => {
      if (formRef.current) {
        // Обновляем валидность формы основываясь на валидности всех полей формы
        const formIsValid = formRef.current.checkValidity();
        setIsValid(formIsValid);
      }
    }, [errors, formRef]); // Отслеживаем только errors и formRef

    const checkFormValidity = () => {
      if (formRef.current) {
        setIsValid(formRef.current.checkValidity());
      }
    };

    // автоматически проверять валидность формы каждый раз при изменении ошибок,
    useEffect(() => {
      checkFormValidity();
    }, [errors]);

    // Функция валидации имени
    const validateName = (name) => {
      const forbiddenWords = ['me', 'i', 'я', 'ja', 'и'];
        if (forbiddenWords.some(word => name.toLowerCase().includes(word))) {
            return 'Использование этого слова в качестве имени запрещено.';
        }
      return '';
    };

    const formatDateToServer = (date) => {
      if (!date) return '';
      // Разбираем дату в формате YYYY-MM-DD
      const [year, month, day] = date.split('-');
      // Преобразуем дату в формат DD.MM.YYYY
      return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
    };

    const formatDateToInput = useCallback((date) => {
      if (!date) return '';
      // Проверяем, содержит ли строка точки - если да, предполагаем формат DD.MM.YYYY
      if (date.includes('.')) {
        const [day, month, year] = date.split('.');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
      // Иначе предпологаем, что дата уже в формате YYYY-MM-DD или другом необходимом формате
      return date;
    }, []);

    const handleChange = (event) => {
      //console.log(values);
      const { target } = event;
      const { name, value } = target;
      // Обрабатываем поле 'address' отдельно для установки isAddressValid
      if (name === 'address') {
        const isAddressValid = value.trim() !== '';
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
          isAddressValid: isAddressValid,
        }));
        // После установки нового состояния проверьте валидность формы.
        checkFormValidity();
      } else if (name === 'name') {// Обработчики других полей
        const nameError = validateName(value);
        setValues(prevValues => ({ ...prevValues, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: nameError }));
      } else {
        // Обрабатываем другие входные данные, такие как 'email', 'password' и т.д.
          setValues((prevValues) => ({...prevValues, [name]: value }));
          setErrors((prevErrors) => ({...prevErrors, [name]: target.validationMessage, // Стандартное сообщение об ошибке
        }));
        // верная структура для обновления вложенного состояния `messenger_account`
        setValues(prevValues => ({...prevValues, messenger_account: {...prevValues.messenger_account,
            [name]: value,
          }
        }));
      }
      checkFormValidity();
    };

    const handleInput = (event) => {
      const { target } = event;
      // Это автозаполнение адреса
      if (target.name === 'address') {
        handleChange(event); // Используем уже существующий handleChange
      }
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
      formatDateToInput,
      formRef,
      handleInput,
      checkFormValidity
    };
}

export default useFormValidation;