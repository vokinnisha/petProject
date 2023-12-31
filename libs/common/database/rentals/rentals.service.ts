import { Injectable } from '@nestjs/common';
import { InitDataBase } from '../database.service';
import { RentalsEntity } from './rentals.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomerService } from '../customers/customers.service';
import { BooksService } from '../books/books.service';

@Injectable()
export class RentalService {
    constructor(
        private initDataBase: InitDataBase,
        private customersService: CustomerService,
        private booksService: BooksService

    ) { }

    async rentBook(rawRent: RentalsEntity) {
        const rental = plainToClass(RentalsEntity, rawRent)

        const validateError = await validate(rental)

        if (validateError.length > 0) {
            throw new Error('Ошибка валидации, проверьте ваш JSON или обратитесь к администратору')
        }

        try {
            await this.initDataBase.sqlRequest(`BEGIN`, [])

            await this.booksService.getBook(rental.book_id) // проверка наличия книги

            await this.customersService.getUser(rental.customer_id) // проверка наличия юзера

            const updateResult = await this.initDataBase.sqlRequest(`
            UPDATE books SET available = available - 1 
            WHERE book_id = $1 AND available > 0
            RETURNING *
            `, [rental.book_id]
            )

            if (updateResult?.length <= 0) {
                throw new Error('Обновление не выполнено, книга уже не доступна')
            }


            const rentalResponse = await this.initDataBase.sqlRequest(`
            INSERT INTO rentals(book_id, customer_id, date_rented, date_returned, date_of_expire)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `, [
                rental.book_id,
                rental.customer_id,
                rental.date_rented,
                rental.date_returned
            ]
            )

            await this.initDataBase.sqlRequest(`COMMIT`, [])

            return rentalResponse

        } catch (error) {
            await this.initDataBase.sqlRequest(`ROLLBACK`, [])
            throw error
        }
    }

    async updateRent() {

    }

    async deleteRent() {

    }

    async getRent(rentalId: number) {
        const rental = await this.initDataBase.sqlRequest(`
        SELECT * FROM rentals
        WHERE rental_id = $1
        `, [rentalId]
        )

        if (!rental.length) {
            throw new Error('Аренды нет')
        }
        console.log(rental)
        return rental
    }

}