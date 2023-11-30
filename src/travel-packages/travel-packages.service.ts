import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPackage } from './entities/travel-package.entity';
import { Image } from '../images/entities/image.entity';
import { TravelPackageDTO } from './travel-package.dto';
import { QueryTravelPackageDTO } from './query-travel-package.dto';

@Injectable()
export class TravelPackagesService {
    constructor(
        @InjectRepository(TravelPackage)
        private travelPackageRepository: Repository<TravelPackage>,
        @InjectRepository(Image)
        private imageRepository: Repository<Image>
    ) { }

    async createPackage(dto: TravelPackageDTO): Promise<TravelPackage> {
        const travelPackage = this.travelPackageRepository.create({
            packageName: dto.packageName,
            description: dto.description,
            destination: dto.destination,
            startDate: dto.startDate,
            endDate: dto.endDate,
            price: dto.price
        });
        const savedPackage = await this.travelPackageRepository.save(travelPackage);

        if (dto.images) {
            await Promise.all(dto.images.map(async (imgBuffer) => {
                const image = this.imageRepository.create({
                    image: imgBuffer,
                    description: dto.description,
                    package: savedPackage
                });
                await this.imageRepository.save(image);
            }));
        }

        return savedPackage;
    }

    async findAll(): Promise<TravelPackage[]> {
        return this.travelPackageRepository.find({ relations: ['images'] });
    }

    async findById(id: number): Promise<TravelPackage | null> {
        return this.travelPackageRepository.findOne({ where: { packageID: id }, relations: ['images'] });
    }

    async findByQuery(query: QueryTravelPackageDTO): Promise<TravelPackage[]> {
        const queryBuilder = this.travelPackageRepository
            .createQueryBuilder('travelPackage')
            .leftJoinAndSelect('travelPackage.images', 'images');

        if (query.destination) {
            queryBuilder.andWhere('LOWER(travelPackage.destination) LIKE LOWER(:destination)', {
                destination: `%${query.destination}%`
            });
        }

        if (query.startDate) {
            queryBuilder.andWhere('travelPackage.startDate < :startDate', {
                startDate: query.startDate
            });
        }

        if (query.endDate) {
            queryBuilder.andWhere('travelPackage.endDate > :endDate', {
                endDate: query.endDate
            });
        }

        return queryBuilder.getMany();
    }

    async updatePackage(id: number, dto: TravelPackageDTO): Promise<TravelPackage> {
        const travelPackage = await this.travelPackageRepository.findOne({ where: { packageID: id }, relations: ['images'] });

        if (!travelPackage) {
            throw new Error(`Pacote de viagens com ID ${id} não encontrado.`);
        }

        const { images, ...packageData } = dto;

        this.travelPackageRepository.merge(travelPackage, packageData);
        const updatedPackage = await this.travelPackageRepository.save(travelPackage);

        if (dto.images) {
            await this.imageRepository.delete({ package: { packageID: id } });

            await Promise.all(dto.images.map(async (imgBuffer) => {
                const image = this.imageRepository.create({
                    image: imgBuffer,
                    description: dto.description,
                    package: updatedPackage
                });
                await this.imageRepository.save(image);
            }));
        }
        return updatedPackage;
    }


    async deletePackage(id: number): Promise<void> {
        const travelPackage = await this.travelPackageRepository.findOne({ where: { packageID: id } });

        if (!travelPackage) {
            throw new Error(`Pacote de viagens com ID ${id} não encontrado.`);
        }

        await this.imageRepository.delete({ package: { packageID: id } });
        await this.travelPackageRepository.delete(id);
    }

}
