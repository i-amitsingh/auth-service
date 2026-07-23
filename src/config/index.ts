import { config } from 'dotenv';

// NODE_ENV must be set before this module is imported.
// We select the env file first, then fall back to .env for any missing keys.
const envFile = (() => {
    const env = process.env.NODE_ENV;
    if (env === 'test') return '.env.test';
    if (env === 'development') return '.env.dev';
    return '.env';
})();

config({ path: envFile });
// Fallback: fill any gaps from the base .env
config({ path: '.env' });

const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
    process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
};
