import { Injectable } from '@nestjs/common';
import { InitDataBase } from '../database.service';
import { CustomersEntity } from './customers.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


Injectable()
export class CustomerService {
    constructor(
        private initDataBase: InitDataBase
    ) { }

    async createUser(rawUser: CustomersEntity) {
        const user = plainToClass(CustomersEntity, rawUser)

        const validateError = await validate(user)

        if (validateError.length > 0) {
            throw new Error('Ошибка валидации, проверьте ваш JSON или обратитесь к администратору')
        }

        const sql = `
        INSERT INTO books(firstName, lastName, birthDate, email, phone, socialLogin)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
        `
        const params = [user.firstName, user.lastName, user.birthDate, user.email, user.phone, user.socialLogin]

        return await this.initDataBase.sqlRequest(sql, params)
    }

    async updateUser() {

    }

    async deleteUser() {

    }

    async getUser() {

    }

}