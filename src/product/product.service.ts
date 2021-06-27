import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ){}

  async createProduct(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    await this.isProductUnique(product.name);
    await product.save();
    return product._id;
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity
    }));
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity
    };
  }

  async updateProduct(id: string, name: string, description: string, category: string, price: number, quantity: number) {
    const updatedProduct = await this.findProduct(id);
    if(name){
      updatedProduct.name = name;
    } 
    if(description) {
      updatedProduct.description = description;
    }  
    if(category) { 
      updatedProduct.category = category;
    }
    if(price) {
      updatedProduct.price = price;
    }
    if(quantity) {
      updatedProduct.quantity = quantity;
    }

    await updatedProduct.save();
  }

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({_id: productId}).exec();
    if (result.n === 0) {
        throw new NotFoundException('Could not find product.');
    }
}

  private async isProductUnique(name: string) {
    const product = await this.productModel.findOne({name});
    if(product) {
      throw new BadRequestException('Product must be unique');
    }
  }

  private async findProduct(id: string): Promise<Product>{
    let product;
    try {
    product = await this.productModel.findById(id).exec();
    } catch (error) {
    throw new NotFoundException('Could not find product.');
    }
    if (!product) {
    throw new NotFoundException('Could not find product.');
    }
    return product;
}
}
