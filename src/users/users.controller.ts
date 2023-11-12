import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: number): Promise<User | null> {
        return this.usersService.findOneById(id);
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.usersService.create(user).catch(error => {
            if (error.message === 'User with this email already exists') {
                throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
            }
            throw error;
        });
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<User> {
        return this.usersService.remove(id);
    }
}
