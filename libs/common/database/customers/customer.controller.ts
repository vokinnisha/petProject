import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CustomersEntity } from './customers.entity';

@Controller('customer')
export class CustomersController {
    constructor(
        private readonly customerService: CustomerService
    ) { }

    @Post()
    async create(@Body() createBookDto: CustomersEntity) {
        try {
            return await this.customerService.createUser(createBookDto);
        } catch (error) {
            return error.message
        }
    }

    @Get('get-customer/:customerId')
    async getBook(@Param('customerId') customerId: number) {
        try {
            return this.customerService.getUser(customerId);
        } catch (error) {
            return error.message
        }
    }
}
