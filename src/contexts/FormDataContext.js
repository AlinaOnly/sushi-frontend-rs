import React, { useState, createContext, useContext } from 'react';

// Создаем новый Context
export const FormDataContext = createContext();

// Создаем Provider в функционально-стилевом компоненте
export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState({});

    // Функция для обновления данных формы
    const updateFormData = (newData) => {
        setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
    };

    return (
        <FormDataContext.Provider value={{ formData, updateFormData }}>
        {children}
        </FormDataContext.Provider>
    );
};

// Создаем хук для использования контекста
export const useFormData = () => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error('useFormData must be used within a FormDataProvider');
    }
    return context;
};