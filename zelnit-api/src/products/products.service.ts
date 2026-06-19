import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async findAll() {
        return this.prisma.product.findMany({
            include: {
                category: true,
                media: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50,
        });
    }
    async findById(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                media: true,
                priceHistory: true,
            },
        });
    }
    async findByCategory(categoryId: string) {
        return this.prisma.product.findMany({
            where: {
                categoryId,
            },
            include: {
                category: true,
                media: true,
            },
        });
    }
}
