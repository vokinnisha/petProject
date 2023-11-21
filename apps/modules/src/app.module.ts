import { Module } from '@nestjs/common';
import {
    BooksService,
    CustomerService,
    RentalService,
    BooksController,
    CustomersController,
    RentalsController,
    InitDataBase,
    initCreateTable
} from '../../../libs/common/index';


@Module({
    imports: [],
    controllers: [
        BooksController,
        CustomersController,
        RentalsController,
    ],
    providers: [
        initCreateTable,
        InitDataBase,
        BooksService,
        CustomerService,
        RentalService,
    ],
})
export class AppModule { }