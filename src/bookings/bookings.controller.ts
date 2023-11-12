import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() bookingData: Partial<Booking>, @Req() req: Request) {
        const user: any = req.user;
        return this.bookingsService.create({ ...bookingData, userID: user.userID });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.bookingsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOneById(@Param('id') id: number) {
        return this.bookingsService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<Booking>) {
        return this.bookingsService.update(id, updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.bookingsService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getByUserID(@Req() req: Request) {
        const user: any = req.user;
        return this.bookingsService.getByUserID(user.userID);
    }
}
