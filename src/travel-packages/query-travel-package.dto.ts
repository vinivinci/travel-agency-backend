import { IsOptional } from "class-validator";

export class QueryTravelPackageDTO {
    @IsOptional()
    destination?: string;

    @IsOptional()
    startDate?: Date;

    @IsOptional()
    endDate?: Date;
}