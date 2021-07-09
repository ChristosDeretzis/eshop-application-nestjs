import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('Product')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

}
