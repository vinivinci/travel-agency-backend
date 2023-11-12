import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
    ) { }

    async create(bookingData: Partial<Booking>): Promise<Booking> {
        const booking = this.bookingRepository.create(bookingData);
        return this.bookingRepository.save(booking);
    }

    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.find({ relations: ['user', 'travelPackage'] });
    }

    async findOneById(id: number): Promise<Booking | null> {
        return this.bookingRepository.findOne({ where: { bookingID: id }, relations: ['user', 'travelPackage'] });
    }

    async update(id: number, updateData: Partial<Booking>): Promise<Booking> {
        const booking = await this.findOneById(id);
        if (!booking) {
            throw new Error(`Booking with ID ${id} not found.`);
        }
        this.bookingRepository.merge(booking, updateData);
        return this.bookingRepository.save(booking);
    }

    async remove(id: number): Promise<void> {
        const booking = await this.findOneById(id);
        if (!booking) {
            throw new Error(`Booking with ID ${id} not found.`);
        }
        await this.bookingRepository.delete(id);
    }

    async getByUserID(userId: number): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { userID: userId }, relations: ['user', 'travelPackage'] });
    }
}
