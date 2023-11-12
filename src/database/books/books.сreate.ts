import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitDataBase } from '../database.service';

Injectable()
export class BooksCreateTable implements OnModuleInit {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    async onModuleInit() {
        await this.initDataBase.sqlRequest(`
        CREATE TABLE IF NOT EXISTS books(
        bookId SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL
        genre VARCHAR(100) NOT NULL,
        publicationYear DATE NOT NULL,
        available INTEGER NOT NULL,
        )`, [] // Передаем пустой массив
        )
    }
}