import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneById(id: number): Promise<User | null> {
        const existingUser = await this.userRepository.findOne({ where: { userID: id } });
        if (!existingUser) {
            throw new Error('User not exists');
        }
        return this.userRepository.findOneBy({ userID: id });
    }

    async create(user: Partial<User>): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return this.userRepository.save({ ...user, password: hashedPassword });
    }

    async update(id: number, user: Partial<User>): Promise<User> {
        const updateResult = await this.userRepository.update(id, user);

        if (updateResult.affected === 1) {
            const updatedUser = await this.userRepository.findOneBy({ userID: id });
            return updatedUser;
        } else {
            throw new Error(`Falha ao atualizar o usuário com o ID ${id}`);
        }
    }

    async remove(id: number): Promise<User> {
        const userToRemove = await this.userRepository.findOneBy({ userID: id });

        if (!userToRemove) {
            throw new Error(`Usuário com o ID ${id} não encontrado.`);
        }

        const deleteResult = await this.userRepository.delete(id);

        if (deleteResult.affected === 1) {
            return userToRemove;
        } else {
            throw new Error(`Falha ao excluir o usuário com o ID ${id}`);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({ email });
    }

    async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
        const user = await this.findByEmail(email);
        const match = await bcrypt.compare(pass, user.password);
        if (match) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

}
