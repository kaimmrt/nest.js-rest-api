import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Put,
} from "@nestjs/common";
import { ProductsService } from "./products.service";


@Controller('products')

export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generateId = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generateId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Put(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }

}