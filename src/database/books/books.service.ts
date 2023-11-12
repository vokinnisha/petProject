import { Injectable } from '@nestjs/common';
import { InitDataBase } from '../database.service';
import { BooksEntity } from './books.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


@Injectable()
export class BooksService {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    async addBook(rawBook: BooksEntity) {
        const book = plainToClass(BooksEntity, rawBook)

        const validateError = await validate(book)

        if (validateError.length > 0) {
            throw new Error('Ошибка валидации, проверьте ваш JSON или обратитесь к администратору')
        }


        const sql = `
        INSERT INTO books(title, author, genre, publicationYear, available)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        `
        const params = [book.title, book.author, book.genre, book.publicationYear, book.available]

        return await this.initDataBase.sqlRequest(sql, params)
    }

    async updateBook() {

    }

    async deleteBook() {

    }

    async getBook(bookId: number) {
        const book = await this.initDataBase.sqlRequest(`
        SELECT * FROM books
        WHERE bookid = $1
        `, [bookId]
        )

        if (!book?.length) {
            throw new Error('Книги нет в наличии')
        }

        return book
    }

}