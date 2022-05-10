import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDTO } from 'src/user/dtos/register-user.dto';
import { AuthService } from './auth.service';
import { UserDetails } from '../user/user-details.interface';
import { LoginUserDTO } from 'src/user/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() user: RegisterUserDTO): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: LoginUserDTO): Promise<{ token: string } | null> {
        return this.authService.login(user);
    }
}