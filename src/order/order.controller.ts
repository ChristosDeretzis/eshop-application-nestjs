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
  @ApiOperation({summary: 'Delete an order'})
  @ApiOkResponse({}) 
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
