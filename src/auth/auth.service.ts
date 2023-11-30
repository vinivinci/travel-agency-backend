import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }


    async login(email: string, password: string) {
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { email: user.email, sub: user.userID };
        return {
            access_token: this.jwtService.sign(payload),
            id: user.userID,
            email: user.email,
            name: user.name,
        };
    }

}

