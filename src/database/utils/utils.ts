import { Injectable } from "@nestjs/common";
import { InitDataBase } from '../database.service';
import { error } from "console";

Injectable()
export class Utils {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    async checkBook(bookId: number) {
        const book = await this.initDataBase.sqlRequest(`
        SELECT * FROM books
        WHERE bookId = $1
        `, [bookId]
        )

        if (!book.rows.length) {
            throw new Error('Книги нет в наличии')
        }

        return book
    }


    async checkCustomer(customerId: number) {
        const customer = await this.initDataBase.sqlRequest(`
        SELECT * FROM customers
        WHERE customerId = $1
        `, [customerId]
        )

        if (!customer.rows.length) {
            throw new Error('Пользователь не создан')
        }
        return customer
    }
}