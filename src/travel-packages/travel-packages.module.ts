import { Module } from '@nestjs/common';
import { TravelPackagesController } from './travel-packages.controller';
import { TravelPackagesService } from './travel-packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPackage } from './entities/travel-package.entity';
import { Image } from '../images/entities/image.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPackage, Image]),
  ],
  controllers: [TravelPackagesController],
  providers: [TravelPackagesService]
})
export class TravelPackagesModule { }
