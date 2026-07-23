import express from 'express';
import type { RegisterUserRequest } from '../types/index.ts';
import { UserService } from '../services/UserService.ts';

export class AuthController {
    constructor(private userService: UserService) {}
    async register(req: RegisterUserRequest, res: express.Response) {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
                errors: [{ message: 'All fields are required' }],
            });
            return;
        }

        await this.userService.create({ firstName, lastName, email, password });

        res.status(201).json({ message: 'User registered successfully' });
    }
}
