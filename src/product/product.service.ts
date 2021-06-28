import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
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
    return this.formatProduct(product);
  }

  async getAllProducts(req: Request) {
    const sort = {}
    if(req.query.sortBy){
      const parts = req.query.sortBy.toString().split("_");
      sort[parts[0]] = (parts[1] === 'desc' ? -1 : 1);
    }
    const products = await this.productModel
                    .find()
                    .limit(Number(req.query.limit))
                    .skip(Number(req.query.skip))
                    .sort(sort).exec();
                    
    return products.map((product) => this.formatProduct(product));
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return this.formatProduct(product);
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

    return this.formatProduct(updatedProduct);
  }

  async deleteProduct(productId: string) {
    const deletedProduct = await this.findProduct(productId);
    const result = await this.productModel.deleteOne({_id: productId}).exec();
    if (result.n === 0) {
        throw new NotFoundException('Could not find product.');
    }
    return this.formatProduct(deletedProduct);
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

  private formatProduct(prod: Product) {
    return {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      quantity: prod.quantity
    };
  }
}
