import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSchema } from './schemas/order.schema';
import { OrderItemSchema } from './schemas/order-item.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'OrderItem', schema: OrderItemSchema }])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
