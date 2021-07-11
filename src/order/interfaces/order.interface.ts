import { Document } from "mongoose";
import { Product } from "src/product/interfaces/product.interface";
import { User } from "src/user/interfaces/user.interface";

export interface Order extends Document{
    user: User,
    products: [OrderItem],
    finalize: boolean,
    createDate: Date
}

interface OrderItem extends Document{
    product: Product,
    quantity: number
}

interface Address extends Document {
    address: string,
    city: string,
    postalCode: string,
    country: string
}

