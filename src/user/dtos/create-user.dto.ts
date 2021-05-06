import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {

    @ApiProperty({
        example: 'Christos',
        description: 'The name of the User',
        format: 'string',
        minLength: 3,
        maxLength: 255
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly firstName: string;

    @ApiProperty({
        example: 'Papadopoulos',
        description: 'The surname of the User',
        format: 'string',
        minLength: 3,
        maxLength: 255
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly lastName: string;

    @ApiProperty({
        example: 'nik982',
        description: 'The username of the User',
        format: 'string',
        minLength: 5,
        maxLength: 255
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly username: string;

    @ApiProperty({
        example: 'nik982@gmail.com',
        description: 'The email of the User',
        format: 'email',
        minLength: 5,
        maxLength: 255
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: 'create a passwoed',
        description: 'The password of the User',
        format: 'string',
        minLength: 5,
        maxLength: 1024
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
}