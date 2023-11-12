import { Injectable } from '@nestjs/common';
import { InitDataBase } from '../database.service';
import { RentalsEntity } from './rentals.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Utils } from '../utils/utils';

Injectable()
export class RentalService {
    constructor(
        private initDataBase: InitDataBase,
        private utils: Utils
    ) { }

    async rentBook(rawRent: RentalsEntity) {
        const rental = plainToClass(RentalsEntity, rawRent)

        const validateError = await validate(rental)

        if (validateError.length > 0) {
            throw new Error('Ошибка валидации, проверьте ваш JSON или обратитесь к администратору')
        }

        try {
            await this.initDataBase.sqlRequest(`BEGIN`, [])

            const book = (await this.utils.checkBook(rental.bookId)).rows[0]

            if (book.available === 0) throw new Error('У пользователя книга, которой нет в наличии. Необходимо провести ревизию')

            const customer = (await this.utils.checkCustomer(rental.customerId)).rows[0]

            const rentalResponse = await this.initDataBase.sqlRequest(`
            INSERT INTO rentals(bookId, customerId, dateRented, dateReturned)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `, [rental.bookId, rental.customerId, rental.dateRented, rental.dateReturned]
            )

            await this.initDataBase.sqlRequest(`
            UPDATE books SET available = available - 1
            WHERE bookId = $1
            `, [rental.bookId]
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

    async getRent() {

    }

}