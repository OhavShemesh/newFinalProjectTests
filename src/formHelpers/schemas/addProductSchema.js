import Joi from "joi";

const addProductSchema = {
    name: Joi.string().min(2).max(256).required().messages({
        "string.empty": "Field is required",
        "string.min": "Minimum 2 characters",
        "string.max": "Maximum 256 characters",
    }),
    description: Joi.string().min(10).max(1000).required().messages({
        "string.empty": "Field is required",
        "string.min": "Minimum 10 characters",
        "string.max": "Maximum 1000 characters",
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Must be a number",
        "number.positive": "Must be a positive number",
        "any.required": "Field is required",
    }),
    url: Joi.string()
        .pattern(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        .required()
        .messages({
            "string.empty": "Field is required",
            "string.pattern.base": "Must be a valid URL",
        }),
    alt: Joi.string().min(2).max(256).allow("").messages({
        "string.min": "Minimum 2 characters",
        "string.max": "Maximum 256 characters",
    }),
    inStock: Joi.number().integer().min(0).required().messages({
        "number.base": "Must be a number",
        "number.integer": "Must be an integer",
        "number.min": "Minimum value is 0",
        "any.required": "Field is required",
    }),
    category: Joi.string()
        .valid("Electronics", "Tools", "Furniture", "Garden")
        .required()
        .messages({
            "any.only": "Category must be one of: electronics, tools, furniture, garden",
            "string.empty": "Field is required",
        }),
};

export default addProductSchema;
