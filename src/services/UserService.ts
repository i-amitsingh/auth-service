import { User } from '../entity/User.ts';
import type { UserData } from '../types/index.ts';
import { Repository } from 'typeorm';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        const user = this.userRepository.create({
            firstName,
            lastName,
            email,
            password,
        });
        await this.userRepository.save(user);
    }
}
