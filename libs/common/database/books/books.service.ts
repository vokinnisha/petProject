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
            console.log(validateError)
            throw new Error('Ошибка валидации, проверьте ваш JSON или обратитесь к администратору')
        }

        const params = [
            book.title,
            book.author,
            book.genre,
            book.publication_year,
            book.available,
            book.translation_author,
            book.publisher,
            book.price,
            book.description
        ]

        return await this.initDataBase.sqlRequest(`
        INSERT INTO books(title, author, genre, publication_year, available, translation_author, publisher, price, description)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `, params)
    }

    async updateBook() {

    }

    async deleteBook() {

    }

    async getBook(bookId: number) {
        const book = await this.initDataBase.sqlRequest(`
        SELECT * FROM books
        WHERE book_id = $1
        `, [bookId]
        )

        if (!book?.length) {
            throw new Error('Книги нет в наличии')
        }

        return book
    }
}