import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/user/interfaces/user.interface";
import { OrderItemDto } from "./order-item.dto";

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
}