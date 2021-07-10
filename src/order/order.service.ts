import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { Order } from './interfaces/order.interface';
import { OrderItem } from './interfaces/order-item.interface'

@Injectable()
export class OrderService {

    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>, @InjectModel('OrderItem') private readonly orderItemModel: Model<OrderItem>){}

    async createOrder(orderDto: OrderDto) {
        const orderItemsIds = Promise.all(orderDto.products.map(async (orderItem) =>{
            let newOrderItem = new this.orderItemModel({
                quantity: orderItem.quantity,
                product: orderItem.product
            })
    
            newOrderItem = await newOrderItem.save();
    
            return newOrderItem._id;
        }));
        const orderItemsIdsResolved =  await orderItemsIds;

        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
            const orderItem = await this.orderItemModel.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice
        }));

        const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

        const newOrder = new this.orderModel({
            orderItems: orderItemsIdsResolved,
            user: orderDto.user,
            totalPrice: totalPrice
        });
        await newOrder.save()
    }
}
