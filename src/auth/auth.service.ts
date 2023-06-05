
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string){ // check if user authorized
        
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === pass) { // ! password check if user found
            const { password, ...result } = user;
            return {...result};
        }
        return null;
    }

    async login(user: {email: string, password: string}) { // log in
        const userModel: User = await this.userService.findOneByEmail(user.email)
        const payload = {email: userModel.email, role: userModel.role, establishmentId: userModel.establishmentId}
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
