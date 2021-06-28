import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';

@ApiTags('Product')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({summary: 'Create a product'})
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  @ApiCreatedResponse({})
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all Products'})
  @ApiOkResponse({})
  async getProducts(@Req() req: Request) {
    return await this.productService.getAllProducts(req);
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
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({summary: 'Update a single product'})
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
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
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({summary: 'Delete a single product'})
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  @ApiParam({name: 'id', description: 'id of product we want to delete'})
  @ApiOkResponse({})
  async deleteProduct(@Param("id") productId: string) {
    return await this.productService.deleteProduct(productId);
  }
}
