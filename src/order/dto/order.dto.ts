import { User } from "src/user/interfaces/user.interface";
import { OrderItemDto } from "./order-item.dto";

export class OrderDto {
    readonly user: User

    readonly products: OrderItemDto[];
}