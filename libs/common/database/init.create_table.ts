import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitDataBase } from './database.service';

@Injectable()
export class initCreateTable implements OnModuleInit {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    // async onModuleInit() {
    //     await this.initDataBase.sqlRequest(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    //     await this.initDataBase.sqlRequest(`
    //     CREATE TABLE IF NOT EXISTS books(
    //     bookId UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    //     title VARCHAR(100) NOT NULL,
    //     author VARCHAR(100) NOT NULL,
    //     genre VARCHAR(100) NOT NULL,
    //     publicationYear DATE NOT NULL,
    //     available INTEGER NOT NULL
    //     translationAuthor VARCHAR(100) NOT NULL,
    //     publisher VARCHAR(100) NOT NULL,
    //     price INTEGER NOT NULL,
    //     description VARCHAR(250) NOT NULL
    //     )`
    //     )

    //     await this.initDataBase.sqlRequest(`
    //     CREATE TABLE IF NOT EXISTS customers(
    //     customerId VARCHAR(50) DEFAULT CONCAT('5-', LEFT(gen_random_uuid()::text, 6)) PRIMARY KEY,
    //     firstName VARCHAR(100) NOT NULL,
    //     lastName VARCHAR(100) NOT NULL,
    //     birthDate DATE NOT NULL,
    //     email VARCHAR(100) UNIQUE NOT NULL,
    //     phone VARCHAR(100) UNIQUE NOT NULL,
    //     socialLogin VARCHAR(100) UNIQUE NOT NULL
    //     )`
    //     )

    //     await this.initDataBase.sqlRequest(`
    //     CREATE TABLE IF NOT EXISTS rentals(
    //     rentalId UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    //     bookId UUID NOT NULL REFERENCES books(bookId),
    //     customerId TEXT NOT NULL REFERENCES customers(customerId),
    //     dateRented DATE NOT NULL,
    //     dateReturned DATE,
    //     dateOfExpire DATE NOT NULL
    //     )`
    //     )
    // }

    async onModuleInit() {
        console.log("nModuleInit called")
        await this.initDataBase.sqlRequest(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

        await this.initDataBase.sqlRequest(`
        CREATE TABLE IF NOT EXISTS books(
        book_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        publication_year DATE NOT NULL,
        available INTEGER NOT NULL,
        translation_author VARCHAR(100) NOT NULL,
        publisher VARCHAR(100),
        price INTEGER NOT NULL,
        description VARCHAR(250) NOT NULL
        )`)

        await this.initDataBase.sqlRequest(`
        CREATE TABLE IF NOT EXISTS customers(
        customer_id VARCHAR(50) PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        birth_date DATE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(100) UNIQUE NOT NULL,
        social_login VARCHAR(100) UNIQUE NOT NULL
        )`)

        await this.initDataBase.sqlRequest(`
        CREATE OR REPLACE FUNCTION create_customer_id()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.customer_id := CONCAT('5-', UPPER(LEFT(gen_random_uuid()::text, 6)));
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        `)

        await this.initDataBase.sqlRequest(`
        DROP TRIGGER IF EXISTS before_insert_customers ON customers
        `)

        await this.initDataBase.sqlRequest(`
        CREATE TRIGGER before_insert_customers
        BEFORE INSERT ON customers
        FOR EACH ROW
        EXECUTE FUNCTION create_customer_id();
        `)
        await this.initDataBase.sqlRequest(`
        CREATE TABLE IF NOT EXISTS rentals(
        rental_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        book_id UUID NOT NULL REFERENCES books(book_id),
        customer_id VARCHAR(50) NOT NULL REFERENCES customers(customer_id),
        date_rented DATE NOT NULL,
        date_returned DATE,
        date_of_expire DATE NOT NULL
        )`)
    }
}