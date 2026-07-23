import { User } from '../entity/User.ts';
import type { UserData } from '../types/index.ts';
import { Repository } from 'typeorm';
import createHttpError from 'http-errors';
import { roles } from '../constants/index.ts';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        try {
            await this.userRepository.save({
                firstName,
                lastName,
                email,
                password,
                role: roles.Customer,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                'Error occurred while creating user',
            );
            throw error;
        }
    }
}
