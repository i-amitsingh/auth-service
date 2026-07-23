import { describe } from 'node:test';
import app from '../../src/app.ts';
import request from 'supertest';

describe('POST /auth/register', () => {
    describe('Given all fields', () => {
        it('should return 201 status code', async () => {
            // AAA -> Arrange Act Assert
            //  Arrange
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            //  Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            //  Assert
            expect(response.statusCode).toBe(201);
        });

        it('should return valid json response', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            //  Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            //  Assert
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
            //  Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            //  Assert
            expect(response.body).toEqual({
                message: 'User registered successfully',
            });
        });

        it('should persist the user data in the database', async () => {
            const userData = {
                firstName: 'amit',
                lastName: 'singh',
                email: 'amit@gmail.com',
                password: 'password123',
            };
            //  Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            //  Assert
            expect(response.body).toEqual({
                message: 'User registered successfully',
            });
        });
    });

    describe('Fields are missing', {});
});
