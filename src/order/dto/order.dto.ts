import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/user/interfaces/user.interface";
import { OrderItemDto } from "./order-item.dto";
import { ShippingDto } from "./shipping.dto";

export class OrderDto {

    @ApiProperty({
        example: "6095a2f0c414e33b18105625",
        description: "The id of the user",
        format: "string"
    })
    @IsNotEmpty()
    readonly user: User

    @ApiProperty({
        description: "The list of the ordered products of the user",
        type: [OrderItemDto]
    })
    @IsNotEmpty()
    readonly products: OrderItemDto[];

    @ApiProperty({
        description: "The shipping Details of the user",
        type: ShippingDto
    })
    @IsNotEmpty()
    readonly shipping: ShippingDto;

    @ApiProperty({
        example: "Pending",
        description: "The status of the order",
        format: "string"
    })
    readonly status: string;
}