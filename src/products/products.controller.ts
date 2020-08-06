import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ): any {
        const generatedId = this.productService.insertProduct(
            prodTitle, 
            prodDesc, 
            prodPrice
        );
        return {id: generatedId};
    }

    @Get()
    getAllProducts(): any {
        return this.productService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string): any {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDes: string,
        @Body('price') prodPrice: number    
    ): any {
        this.productService.updateProduct(
            prodId,
            prodTitle,
            prodDes,
            prodPrice
        );
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string,): any {
        this.productService.deleteProduct(prodId);
        return null;
    }
}