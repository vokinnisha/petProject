import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitDataBase } from '../database.service';


@Injectable()
export class RentalsCreateTable implements OnModuleInit {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    async onModuleInit() {
        await this.initDataBase.sqlRequest(`
        CREATE TABLE IF NOT EXISTS rentals(
        rentalId SERIAL PRIMARY KEY,
        bookId INTEGER NOT NULL REFERENCES books(bookId),
        customerId INTEGER NOT NULL REFERENCES customers(customerId),
        dateRented DATE NOT NULL,
        dateReturned DATE NOT NULL
        )`, [] // Передаем пустой массив
        )
    }
}