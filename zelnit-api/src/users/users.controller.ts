import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    @UseGuards(JwtGuard)
    @Get('me')
    me(@Req() req: any) {
        return req.user;
    }
}
