import { Document } from "mongoose";
import { Product } from "src/product/interfaces/product.interface";
import { User } from "src/user/interfaces/user.interface";

export enum OrderStatus {
    NEW = 'NEW',
    PAID = 'PAID',
    SHIPPING = 'SHIPPING',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
  }
  
interface OrderItem {
    product: Product,
    quantity: number
}

interface Address {
    address: string,
    city: string,
    postalCode: string,
    country: string
}

export interface Order extends Document{
    user: User,
    products: [OrderItem],
    finalize: boolean,
    createDate: Date,
    status: string,
    shippingInfo: Address
}

