import { Injectable } from '@nestjs/common';
import { InitDataBase } from '../database.service';
import { CustomersEntity } from './customers.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


@Injectable()
export class CustomerService {
    constructor(
        private initDataBase: InitDataBase

    ) { }

    async createUser(rawUser: CustomersEntity) {
        const user = plainToClass(CustomersEntity, rawUser)

        const validateError = await validate(user)

        if (validateError.length > 0) {
            console.log(validateError)
            throw new Error('Ошибка валидации, проверьте ваш JSON или обратитесь к администратору')
        }

        const params = [
            user.first_name,
            user.last_name,
            user.birth_date,
            user.email,
            user.phone,
            user.social_login
        ]

        return await this.initDataBase.sqlRequest(`
        INSERT INTO customers(first_name, last_name, birth_date, email, phone, social_login)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
        `, params)
    }

    async updateUser() {

    }

    async deleteUser() {

    }

    async getUser(customerId: number) {
        const customer = await this.initDataBase.sqlRequest(`
        SELECT * FROM customers
        WHERE customer_id = $1
        `, [customerId]
        )

        if (!customer?.length) {
            throw new Error('Пользователь не создан')
        }
        return customer
    }

}