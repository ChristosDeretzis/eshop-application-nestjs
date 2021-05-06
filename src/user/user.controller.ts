import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Register user',})
    @ApiCreatedResponse({})
    async register(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO);
    }
}
