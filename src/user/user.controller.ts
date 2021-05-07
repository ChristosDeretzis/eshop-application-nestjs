import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateUserDTO } from './dtos/create-user.dto';
import { VerifyUuidDto } from './dtos/verify-uuid.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { LoginUserDTO } from './dtos/login-user.dto';
import { RefreshAccessTokenDto } from './dtos/refresh-access-token.dto';
import { CreateForgotPasswordDto } from './dtos/create-forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

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

    @Post('refresh-access-token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Refresh access token with refresh token',})
    @ApiCreatedResponse({})
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Refresh access token with refresh token',})
    @ApiCreatedResponse({})
    async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        return await this.userService.forgotPassword(req, createForgotPasswordDto);
    }

    @Post('forgot-password-verify')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Verfiy forget password code',})
    @ApiOkResponse({})
    async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Reset password after verify reset password',})
    @ApiOkResponse({})
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return await this.userService.resetPassword(resetPasswordDto);
    }
}
