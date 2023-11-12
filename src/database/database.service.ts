import { Injectable } from "@nestjs/common";
import { Pool } from "pg"

@Injectable()
export class InitDataBase {
    private client: Pool;

    constructor() {
        this.client = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'DataBase',
            password: 'injectMySkill',
            database: 'postNew'
        })
    }


    async sqlRequest(sql: string, param: any[]) {
        const response = await this.client.query(sql, param);

        return response.rows
    }
}