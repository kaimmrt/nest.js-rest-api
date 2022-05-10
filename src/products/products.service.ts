import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title: title,
            description: desc,
            price: price
        });
        const result = await newProduct.save()
        return result.id as string;
    }

    async getProducts() {
        const result = await this.productModel.find().exec();
        return result as Product[];
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return product;
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if (title)
            updatedProduct.title = title;
        if (desc)
            updatedProduct.description = desc;
        if (price)
            updatedProduct.price = price;
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const deletedProduct = await this.findProduct(productId);
        const result = await this.productModel.deleteOne({ _id: productId }).exec();
        return result;
    }

    private async findProduct(id: string): Promise<Product> {
        try {
            const product = await this.productModel.findById(id);
            return product;
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
    }
}