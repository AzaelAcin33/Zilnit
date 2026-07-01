import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

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
    async create(dto: CreateProductDto) {
  return this.prisma.product.create({
    data: {
      platformSource: dto.platformSource,
      externalProductId: dto.externalProductId,
      title: dto.title,
      slug: dto.slug,
      description: dto.description,
      price: dto.price,
      originalPrice: dto.originalPrice,
      currency: dto.currency,
      shippingCost: dto.shippingCost,
      affiliateUrl: dto.affiliateUrl,
      purchaseUrl: dto.purchaseUrl,
      brand: dto.brand,
      rating: dto.rating,
      reviewCount: dto.reviewCount,
      stock: dto.stock,
      categoryId: dto.categoryId,
    },
    include: {
      category: true,
      media: true,
    },
  });
}
}
