import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TravelPackagesModule } from './travel-packages/travel-packages.module';
import { BookingsModule } from './bookings/bookings.module';
import { ImagesModule } from './images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TravelPackagesModule,
    BookingsModule,
    ImagesModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppDataSource.options;
      },
    }),
  ],
})
export class AppModule { }
