import express from 'express';
import type { RegisterUserRequest } from '../types/index.ts';
import { UserService } from '../services/UserService.ts';
import { Logger } from 'winston';

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}
    async register(
        req: RegisterUserRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body;
        this.logger.debug(
            `New request to register user: ${firstName} ${lastName}, email: ${email}`,
        );
        try {
            await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info(`User registered successfully: ${email}`);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            next(error);
            return;
        }
    }
}
