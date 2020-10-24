import Joi from 'joi';

export default {
    login: Joi.object().keys({
        username: Joi.string().required().min(3),
        password: Joi.string().required(),
    }),
};
