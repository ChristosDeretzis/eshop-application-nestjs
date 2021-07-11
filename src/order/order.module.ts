import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSchema } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/schemas/product.schema';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'Product', schema: ProductSchema}, {name: 'User', schema: UserSchema}])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
