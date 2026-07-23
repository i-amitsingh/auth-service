import { AppDataSource } from '../src/config/data-source.ts';

export default async function globalTeardown() {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
}
