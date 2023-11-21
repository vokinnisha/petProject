import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsInt,
    IsString,
    IsOptional,
    IsDate,
    Min
} from 'class-validator';


export class RentalsEntity {
    @IsOptional()
    @IsInt()
    rental_id?: number; // Аренда книги (primary key)

    @IsOptional()
    @IsInt()
    book_id: number; // айди книги (foreign key)

    @IsOptional()
    @IsInt()
    customer_id: number; // айди пользователя (foreign key)

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date_rented: Date; // Дата сдачи в аренду

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    date_returned: Date; // Дата возврата

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date_of_expire: Date // дата, когда должен сдать
}