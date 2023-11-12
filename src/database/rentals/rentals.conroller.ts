import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RentalService } from './rentals.service';
import { RentalsEntity } from './rentals.entity';

@Controller('rentals')
export class RentalsController {
    constructor(
        private readonly rentalService: RentalService
    ) { }

    @Post()
    async create(@Body() createBookDto: RentalsEntity) {
        try {
            return await this.rentalService.rentBook(createBookDto);
        } catch (error) {
            return error.message
        }
    }

    @Get('get-rentals/:rentalId')
    async getRent(@Param('rentalId') rentalId: number) {
        try {
            return await this.rentalService.getRent(rentalId);
        } catch (error) {
            return error.message
        }
    }
}
