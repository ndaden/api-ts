import Joi from 'joi';

export default {
    signup: Joi.object().keys({
        username: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }),
};
