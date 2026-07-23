import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Config } from './index.ts';
import { User } from '../entity/User.ts';

const requireEnv = (name: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};

const port = Number(requireEnv('DB_PORT', Config.DB_PORT));
if (Number.isNaN(port)) {
    throw new Error(`DB_PORT must be a number, got: ${Config.DB_PORT}`);
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: requireEnv('DB_HOST', Config.DB_HOST),
    port,
    username: requireEnv('DB_USERNAME', Config.DB_USERNAME),
    password: requireEnv('DB_PASSWORD', Config.DB_PASSWORD),
    database: requireEnv('DB_NAME', Config.DB_NAME),
    // synchronize auto-creates schema from entities — only for test (TDD).
    // Dev and production always use migrations.
    synchronize: Config.NODE_ENV === 'test',
    logging: false,
    entities: [User],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
