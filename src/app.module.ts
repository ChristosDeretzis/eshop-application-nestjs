import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://christos:UbC0cX9InKXOjZk2@cluster0.cqfux.mongodb.net/eshop?retryWrites=true&w=majority'), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
