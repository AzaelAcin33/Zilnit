import { BadRequestException, Injectable } from '@nestjs/common';
import * as bycript from 'bcrypt';
import { RegisterDto } from 'src/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: dto.email },
                    { username: dto.username },
                ],
            },
        });

        if (existingUser) {
            throw new BadRequestException(
                'El usuario o email ya existe'
            );
        }

        const passwordHash = await bycript.hash(
            dto.password,
            10,
        );

        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                passwordHash
            },
        });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    }
}
