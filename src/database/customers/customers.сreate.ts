import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitDataBase } from '../database.service';


export class CustomersCreateTable implements OnModuleInit {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    async onModuleInit() {
        await this.initDataBase.sqlRequest(`
        CREATE TABLE IF NOT EXISTS customers(
        customerId SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(100) UNIQUE NOT NULL,
        socialLogin VARCHAR(100) UNIQUE NOT NULL,
        )`, [] // Передаем пустой массив
        )
    }
}