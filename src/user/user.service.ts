import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { ForgotPassword } from './interfaces/forgot-password.interface';
import { User } from './interfaces/user.interface';
import { v4 } from 'uuid';
import { addHours } from 'date-fns';
import { Request } from 'express';
import { VerifyUuidDto } from './dtos/verify-uuid.dto';
import { LoginUserDTO } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    HOURS_TO_VERIFY = 4;
    HOURS_TO_BLOCK = 6;
    LOGIN_ATTEMPTS_TO_BLOCK = 5;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('ForgotPassword') private readonly forgotPasswordModel: Model<ForgotPassword>,
        private readonly authService: AuthService,
        ) {}


    async create(createUserDTO: CreateUserDTO): Promise<User> {
        const user = new this.userModel(createUserDTO);
        await this.isEmailUnique(user.email);
        this.setRegistrationInfo(user);
        await user.save();
        return this.buildRegistrationInfo(user);
    }

    async verifyEmail(req: Request, verifyUuidDto: VerifyUuidDto) {
        const user = await this.findByVerification(verifyUuidDto.verification);
        await this.setUserAsVerified(user);
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        };
    }

    async login(req: Request, loginUserDTO: LoginUserDTO) {
        const user = await this.findUserByEmail(loginUserDTO.email);
        this.isUserBlocked(user);
        await this.checkPassword(loginUserDTO.password, user);
        await this.passwordsAreMatch(user);
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            usermame: user.username,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        }
    }


    // Helper functions

    private setRegistrationInfo(user: User): any {
        user.verification = v4();
        user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY);
    }

    private async isEmailUnique(email: string) {
        const user = await this.userModel.findOne({email, verified: true});
        if(user){
            throw new BadRequestException('Email must be unique');
        }
    }

    private buildRegistrationInfo(user): any {
        const userRegistrationInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            verified: user.verified,
        };
        return userRegistrationInfo;
    }

    private async findByVerification(verification: string): Promise<User> {
        const user = await this.userModel.findOne({verification, verified: false, verificationExpires: {$gt: new Date()}});
        if (!user) {
            throw new BadRequestException('Bad request.');
        }
        return user;
    }

    private async setUserAsVerified(user) {
        user.verified = true;
        await user.save();
    }

    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email, verified: true});
        if (!user) {
          throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }

    private isUserBlocked(user) {
        if (user.blockExpires > Date.now()) {
            throw new ConflictException('User has been blocked try later.');
        }
    }

    private async checkPassword(attemptPassword: string, user) {
        const match = await bcrypt.compare(attemptPassword, user.password);
        if (!match) {
            await this.passwordsDoNotMatch(user);
            throw new NotFoundException('Wrong email or password.');
        }
        return match;
    }

    private async passwordsDoNotMatch(user) {
        user.loginAttempts += 1;
        await user.save();
        if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
            await this.blockUser(user);
            throw new ConflictException('User blocked.');
        }
    }

    private async blockUser(user) {
        user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
        await user.save();
    }

    private async passwordsAreMatch(user) {
        user.loginAttempts = 0 ;
        await user.save();
    }

}
