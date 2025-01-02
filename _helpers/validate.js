import Joi from 'joi';
import { createError } from './Error.js';

export const validateInput = (schema, data) => {
    const { error, value } = schema.validate(data);
    if (error) {
        throw createError("Validation Failed", 422, { details: error.details });
    }
    return value; // Return validated data
};



// Validation Schema for Register (New User)
export const registerSchema = Joi.object({
    UserName: Joi.string().required()
});

// Validation Schema for StartSessions
export const startSessionSchema = Joi.object({
    UserName: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates MongoDB ObjectId
    .required(),
});

// Validation Schema for EndSessions
export const endSessionSchema = Joi.object({
    SessionID: Joi.string().required(), // Session ID should be a string and required
    pageViews: Joi.number().integer().min(0).required() // pageViews should be a positive integer or 0
});
export const analyticsDataSchema = Joi.object({
    UserName: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates MongoDB ObjectId
    .required(),
    Source: Joi.string().valid('Direct', 'Search', 'Referral',"Unknown").required(),
    Device: Joi.string().valid('Mobile', 'DeskTop', 'Tablet',"Unknown").required(),
    Age: Joi.number().integer().min(0).optional(), // Optional and non-negative
});
export const BlogPageSchema = Joi.object({
    PageUrl: Joi.string()
        .uri({ scheme: ['http', 'https'] }) // Validate URL with http or https scheme
        .required()
});