import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import EnvVarsSchemaInterface from "../types/config/EnvVarsSchema";

dotenv.config({path: path.join(__dirname, "../../.env")});

const envVarsSchema: Joi.ObjectSchema<EnvVarsSchemaInterface> = Joi.object().keys({
    NODE_ENV: Joi.string().valid("production", "development", "test").required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().description("Base URL of rest API"),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    MONGO_PORT: Joi.string().required().description("Mongo DB port"),
    MONGO_INITDB_DATABASE: Joi.string().required().description("Mongo DB name"),
}).unknown();

const { value, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);
const envVars:EnvVarsSchemaInterface = value;

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        option: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        }
    },
    baseURL: envVars.BASE_URL
};