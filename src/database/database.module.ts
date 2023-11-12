import { Module } from '@nestjs/common';
import { BooksCreateTable } from './books/books.сreate';
import { BooksService } from './books/books.service';
import { CustomerService } from './customers/customers.service';
import { CustomersCreateTable } from './customers/customers.сreate';
import { RentalService } from './rentals/rentals.service';
import { RentalsCreateTable } from './rentals/rentals.сreate';


@Module({
    imports: [],
    controllers: [],
    providers: [
        BooksCreateTable,
        BooksService,
        CustomerService,
        CustomersCreateTable,
        RentalService,
        RentalsCreateTable
    ],
})
export class DataBaseModule { }