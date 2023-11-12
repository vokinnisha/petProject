import { Module } from '@nestjs/common';
import { BooksCreateTable } from './books/books.сreate';
import { BooksService } from './books/books.service';
import { CustomerService } from './customers/customers.service';
import { CustomersCreateTable } from './customers/customers.сreate';
import { RentalService } from './rentals/rentals.service';
import { RentalsCreateTable } from './rentals/rentals.сreate';
import { BooksController } from './books/books.conroller';
import { CustomersController } from './customers/customer.conroller';
import { RentalsController } from './rentals/rentals.conroller';
import { InitDataBase } from './database.service';


@Module({
    imports: [],
    controllers: [
        BooksController,
        CustomersController,
        RentalsController,
    ],
    providers: [
        InitDataBase,
        BooksCreateTable,
        BooksService,
        CustomerService,
        CustomersCreateTable,
        RentalService,
        RentalsCreateTable
    ],
})
export class DataBaseModule { }