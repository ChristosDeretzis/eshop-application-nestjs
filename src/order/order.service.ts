import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Product } from 'src/product/interfaces/product.interface';
import { OrderDto } from './dto/order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>, 
        @InjectModel('Product') private readonly productModel: Model<Product>){}

    async createOrder(orderDto: OrderDto){
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
            totalPrice: totalPrice,
            shipping: orderDto.shipping
        });

        await newOrder.save()

        return newOrder.toJSON();
    }

    async updateOrder(orderId: string, req: Request) {
        const order = await this.orderModel.findByIdAndUpdate(
            orderId, 
            {
                status: req.body.status
            },
            { new: true }
        );
        if(!order) {
            throw new NotFoundException("The order cannot be updated");
        }

        return order;
    }

    async deleteOrder(orderId: string) {
        const deletedOrder = await this.orderModel.findById(orderId);
        const result = await this.orderModel.deleteOne({_id: orderId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find product.');
        }

        return deletedOrder;
    }
}
