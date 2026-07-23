import app from '../../src/app.ts';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../src/config/data-source.ts';
import { truncateTables } from '../utils/index.ts';
import { User } from '../../src/entity/User.ts';

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        await truncateTables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe('Given all fields', () => {
        it('should return 201 status code', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            expect(response.statusCode).toBe(201);
        });

        it('should return valid json response', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });

        it('should return correct response body', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            expect(response.body).toEqual({
                message: 'User registered successfully',
            });
        });

        it('should persist the user in the database', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            await request(app).post('/auth/register').send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0]?.firstName).toBe('amit');
            expect(users[0]?.lastName).toBe('singh');
            expect(users[0]?.email).toBe('amit@gmail.com');
        });

        it('should return an id for the created user', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            await request(app).post('/auth/register').send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0]?.id).toBeDefined();
        });
    });
});
