import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateUserDTO } from './dtos/create-user.dto';
import { VerifyUuidDto } from './dtos/verify-uuid.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { LoginUserDTO } from './dtos/login-user.dto';

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

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Verify Email',})
    @ApiOkResponse({})
    async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.verifyEmail(req, verifyUuidDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Login User',})
    @ApiOkResponse({})
    async login(@Req() req: Request, @Body() loginUserDTO: LoginUserDTO) {
        return await this.userService.login(req, loginUserDTO);
    }
}
