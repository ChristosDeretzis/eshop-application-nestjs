import { Document } from "mongoose";
import { User } from "src/user/interfaces/user.interface";
import { OrderItem } from "./order-item.interface";

export interface Order extends Document{
    user: User,
    products: [OrderItem],
    finalize: boolean,
    createDate: Date
}

