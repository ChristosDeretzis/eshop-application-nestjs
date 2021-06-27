import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Create a product'})
  @ApiCreatedResponse({})
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all Products'})
  @ApiOkResponse({})
  async getProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get a single product'})
  @ApiParam({name: 'id', description: 'id of product we want to get'})
  @ApiOkResponse({})
  async getSingleProduct(@Param("id") productId: string) {
    return await this.productService.getProduct(productId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Update a single product'})
  @ApiParam({name: 'id', description: 'id of product we want to update'})
  @ApiOkResponse({})
  async updateProduct(
    @Param("id") productId: string,
    @Body("name") productName: string,
    @Body("description") productDescription: string,
    @Body("category") productCategory: string,
    @Body("price") productPrice: number,
    @Body("quantity") productQuantity: number) {
    return await this.productService.updateProduct( productId,productName, productDescription, productCategory, productPrice, productQuantity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Delete a single product'})
  @ApiParam({name: 'id', description: 'id of product we want to delete'})
  @ApiOkResponse({})
  async deleteProduct(@Param("id") productId: string) {
    return await this.productService.deleteProduct(productId);
  }
}
