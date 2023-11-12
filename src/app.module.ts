import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TravelPackagesModule } from './travel-packages/travel-packages.module';
import { BookingsModule } from './bookings/bookings.module';
import { ImagesModule } from './images/images.module';
import { PackageImageModule } from './package-image/package-image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { AppDataSource } from './data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TravelPackagesModule,
    BookingsModule,
    ImagesModule,
    PackageImageModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return AppDataSource.options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
