import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { TravelPackagesService } from './travel-packages.service';
import { TravelPackageDTO } from './travel-package.dto';

@Controller('travel-packages')
export class TravelPackagesController {
    constructor(private readonly travelPackagesService: TravelPackagesService) { }

    @Post()
    async create(@Body() dto: TravelPackageDTO) {
        try {
            const newPackage = await this.travelPackagesService.createPackage(dto);
            return newPackage;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll() {
        return await this.travelPackagesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        const travelPackage = await this.travelPackagesService.findById(id);
        if (!travelPackage) {
            throw new HttpException(`Pacote de viagens com ID ${id} não encontrado.`, HttpStatus.NOT_FOUND);
        }
        return travelPackage;
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: TravelPackageDTO) {
        try {
            return await this.travelPackagesService.updatePackage(id, dto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            await this.travelPackagesService.deletePackage(id);
            return { message: `Pacote de viagens com ID ${id} excluído com sucesso.` };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
