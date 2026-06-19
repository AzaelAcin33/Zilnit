import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
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
        return this.usersService.findById(
            req.user.userId,
        );
    }
    @UseGuards(JwtGuard)
    @Patch('me')
    updateProfile(
        @Req() req: any,
        @Body() dto: UpdateProfileDto,
    ) {
        return this.usersService.updateProfile(
            req.user.userId,
            dto,
        );
    }
}
