import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('Product')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }
}
