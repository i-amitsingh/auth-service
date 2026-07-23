import { AppDataSource } from '../src/config/data-source.ts';

export default async function globalSetup() {
    process.env.NODE_ENV = 'test';
    await AppDataSource.initialize();
}
