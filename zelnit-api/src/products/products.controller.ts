import { Controller, Get, Param } from '@nestjs/common';
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
    @Get(':id')
    findById(
        @Param('id') id:string,
    ) {
        return this.productsService.findById(id);
    }
    @Get('category/:categoryId')
    findByCategory(
        @Param('categoryId') categoryId: string,
    ) {
        return this.productsService.findByCategory(categoryId);
    }
}
