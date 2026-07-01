import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
 
@Injectable()
export class CategoriesService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async findAll() {
        return this.prisma.category.findMany({
            orderBy: {
                name: 'asc'
            },
        });
    }

    async findById(id: string) {
        const category =
            await this.prisma.category.findUnique({
                where: {
                    id,
                },
                include: {
                    products: true,
                },
            });
        if (!category) {
            throw new NotFoundException(
                'Categoria no encontrada'
            );
        }
        return category;
    }

    async create(dto: CreateCategoryDto) {
        try {
            return await this.prisma.category.create({
                data: {
                    name: dto.name,
                    slug: dto.slug,
                    icon: dto.icon,
                    color: dto.color,
                    description: dto.description,
                    isActive: dto.isActive,
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
            ) {
                throw new ConflictException('Ya existe una categoria con ese nombre o slug');
            }
        }
    }

    async update(
        id: string,
        dto: UpdateCategoryDto,
    ) {
        await this.findById(id);

        return this.prisma.category.update({
            where: {
                id,
            },

            data: {
                name: dto.name,
                slug: dto.slug,
                icon: dto.icon,
                color: dto.color,
                description: dto.description,
                isActive: dto.isActive,
            },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.category.delete({
            where: {
                id,
            }
        })
    }
}
