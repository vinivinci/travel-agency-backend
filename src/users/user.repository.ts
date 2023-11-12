import { AppDataSource } from '../data-source';
import { User } from './entities/user.entity';

export const UserRepository = AppDataSource.getRepository(User).extend({
    async getByEmail(email: string): Promise<User | null> {
        return this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    },
    createUser(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return this.save(user);
    },

    async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
        await this.update(userId, updateData);
        return this.findOneBy({ userId });
    },

    deleteUser(userId: number): Promise<void> {
        return this.delete(userId);
    },

    findAllUsers(): Promise<User[]> {
        return this.find();
    },

    findById(userId: number): Promise<User | null> {
        return this.findOneBy({ userId });
    },
});
