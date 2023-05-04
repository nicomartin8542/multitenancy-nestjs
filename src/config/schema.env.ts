import * as Joi from 'joi';

export const SchemaEnv = Joi.object({
  PORT: Joi.number().required(),
  HOST_DB: Joi.string().required(),
  PORT_DB: Joi.number().required(),
  USERNAME_DB: Joi.string().required(),
  PASSWORD_DB: Joi.string().required(),
  DATABASE_DB: Joi.string().required(),
  PASSWORD_ROOT_DB: Joi.string().required(),
});
