import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) {}

    @Get()
    findAll() {
        return this.productsService.findAll();
    }
    @Get('category/:categoryId')
    findByCategory(
        @Param('categoryId') categoryId: string,
    ) {
        return this.productsService.findByCategory(categoryId);
    }
    @Get(':id')
    findById(
        @Param('id') id:string,
    ) {
        return this.productsService.findById(id);
    }
    @Post()
    create(
        @Body() dto: CreateProductDto,
    ) {
        return this.productsService.create(dto);
    }
}
