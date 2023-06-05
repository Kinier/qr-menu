import { Controller, Post, UseGuards, Body, Get, Logger, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() req: {email: string, password: string}) {
        
        return this.authService.login(req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('register')
    async register(@Body() req: {email: string, password: string}) {
        // this.userService.create({...req, role: "user", restaurant: -1})
        return this.authService.login(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {

        return req.user

        
    }
}
