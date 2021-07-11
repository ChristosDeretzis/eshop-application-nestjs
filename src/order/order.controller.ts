import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Create an order'})
  @ApiCreatedResponse({})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Update an existing order'})
  @ApiParam({name: 'id', description: 'id of order we want to update'})
  @ApiOkResponse({}) 
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async updateOrder(@Param("id") orderId: string, @Req() req: Request) {
    return this.orderService.updateOrder(orderId, req);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Delete an order'})
  @ApiParam({name: 'id', description: 'id of order we want to delete'})
  @ApiOkResponse({}) 
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async deleteOrder(@Param("id") orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all orders'})
  @ApiOkResponse({}) 
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get a single order'})
  @ApiOkResponse({}) 
  @ApiParam({name: 'id', description: 'id of order we want to get'})
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async getSingleOrder(@Param("id") orderId: string) {
    return this.orderService.getSingleOrder(orderId);
  }

  @Get('/get/userorders/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get orders of a user'})
  @ApiOkResponse({})
  @ApiParam({name: 'id', description: 'id of user'})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async getUserOrders(@Param("id") userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  @Get('/get/totalSales')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get total sales from all orders'})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async getTotalSales() {
    return this.orderService.getTotalSales();
  }

  @Get('/get/count')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get total number of orders'})
  @ApiOkResponse({})
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth'
  })
  async getTotalNumberOfOrders() {
    return this.orderService.getTotalNumberOfOrders();
  }
}
