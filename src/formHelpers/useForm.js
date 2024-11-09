import Joi from 'joi';
import React, { useCallback, useEffect, useState } from 'react';

export default function useForm(initialForm, schema, handleSubmit) {
    const [error, setError] = useState({});

    const [data, setData] = useState(initialForm);
    const [isFormValid, setIsFormValid] = useState(false);

    const validateProperty = useCallback(
        (name, value) => {
            let joiSchema = Joi.object({ [name]: schema[name] });
            let { error } = joiSchema.validate({ [name]: value });

            if (error) {
                return error.details[0].message.replace(/".*?"\s/, '');
            }
            return null;
        },
        [schema]
    );

    const validateForm = useCallback(() => {
        const joiSchema = Joi.object(schema);

        const { error } = joiSchema.validate(data, { abortEarly: false });

        if (error) {
            return false;
        }
        return true;
    }, [schema, data]);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;


            const errorMessage = validateProperty(name, value);

            if (errorMessage) {
                setError((prev) => ({ ...prev, [name]: errorMessage }));
            } else {
                setError((prev) => {
                    let obj = { ...prev };
                    delete obj[name];
                    return obj;
                });
            }

            setData((prev) => ({ ...prev, [name]: value }));
        },
        [validateProperty]
    );

    useEffect(() => {
        const isValid = validateForm();
        setIsFormValid(isValid);


    }, [data, validateForm]);


    const onSubmit = () => {
        handleSubmit(data)
    }



    return {
        handleChange,
        error,
        isFormValid,
        onSubmit
    };
}
