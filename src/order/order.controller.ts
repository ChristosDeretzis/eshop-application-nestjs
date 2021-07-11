import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Create an order'})
  @ApiCreatedResponse({})
  async createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Update an existing order'})
  @ApiOkResponse({}) 
  async updateOrder(@Param("id") orderId: string, @Req() req: Request) {
    return this.orderService.updateOrder(orderId, req);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Delete an order'})
  @ApiOkResponse({}) 
  async deleteOrder(@Param("id") orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get all orders'})
  @ApiOkResponse({}) 
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get a single order'})
  @ApiOkResponse({}) 
  async getSingleOrder(@Param("id") orderId: string) {
    return this.orderService.getSingleOrder(orderId);
  }

  @Get('/get/userorders/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get orders of a user'})
  @ApiOkResponse({})
  async getUserOrders(@Param("id") userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  @Get('/get/totalSales')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get total sales from all orders'})
  @ApiOkResponse({})
  async getTotalSales() {
    return this.orderService.getTotalSales();
  }

  @Get('/get/count')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get total number of orders'})
  @ApiOkResponse({})
  async getTotalNumberOfOrders() {
    return this.orderService.getTotalNumberOfOrders();
  }
}
