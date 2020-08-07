/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
            prodPrice
        );
        return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const product = await this.productService.getSingleProduct(prodId);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDes: string,
        @Body('price') prodPrice: number    
    ) {
        await this.productService.updateProduct(
            prodId,
            prodTitle,
            prodDes,
            prodPrice
        );
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string,){
        await this.productService.deleteProduct(prodId);
        return null;
    }
}