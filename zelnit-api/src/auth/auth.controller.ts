import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    register(@Body() dto:RegisterDto) {
        return this.authService.register(dto);
    }
    @Post('login')
    login(@Body() dot: LoginDto) {
        return this.authService.login(
            dot.email,
            dot.password,
        );
    }
}
