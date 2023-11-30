import { IsDateString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class TravelPackageDTO {
    @IsNotEmpty()
    packageName: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty()
    destination: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNumber()
    price: number;

    @IsOptional()
    images?: String[];
}
