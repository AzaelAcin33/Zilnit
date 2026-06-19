import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
                level: true,
                experience: true,
                trustScore: true,
                createdAt: true,
            },
        });
    }
    async findById(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                wallet: true
            },
        });
        if (!user) {
            throw new NotFoundException(
                'Usuario no encontrado'
            );
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            countryCode: user.countryCode,
            language: user.language,
            level: user.level,
            experience: user.experience,
            trustScore: user.trustScore,
            referralCode: user.referralCode,
            wallet: user.wallet,
            createdAt: user.createdAt
        }
    }
    async updateProfile(userId: string, dto: UpdateProfileDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new NotFoundException(
                'Usuario no encontrado',
            );
        }
        try {
            return this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    username: dto.username,
                    avatarUrl: dto.avatarUrl,
                    countryCode: dto.countryCode,
                    language: dto.language,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    avatarUrl: true,
                    countryCode: true,
                    language: true,
                    level: true,
                    experience: true,
                    trustScore: true,
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'El nombre de usuario ya está en uso',
                );
            }
            throw error;
        }
    }
}
