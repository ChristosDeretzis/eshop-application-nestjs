import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface';
import { OrderDto } from './dto/order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>, 
        @InjectModel('Product') private readonly productModel: Model<Product>){}

    async createOrder(orderDto: OrderDto) {
        const orderItems = Promise.all(orderDto.products.map((orderItem) =>{
            let newOrderItem = {
                quantity: orderItem.quantity,
                product: orderItem.product
            }
    
            return newOrderItem;
        }));
        const orderItemsResolved =  await orderItems;

        const totalPrices = await Promise.all(orderItemsResolved.map(async (orderItem)=>{
            const product = await this.productModel.findById(orderItem.product);

            // reduce product stock
            if(product.quantity >= orderItem.quantity) {
                product.quantity -= orderItem.quantity;
            } else {
                throw new BadRequestException("Product with id of " + product.id + " does not have enough stock");
            }
            await product.save();
            
            // calculate price of each order item
            const totalPrice = product.price * orderItem.quantity;
            return totalPrice
        }));

        const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

        const newOrder = new this.orderModel({
            orderItems: orderItemsResolved,
            user: orderDto.user,
            totalPrice: totalPrice
        });

        await newOrder.save()

        return newOrder.toJSON();
    }
}
