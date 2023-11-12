import { IsNotEmpty, IsInt, IsString, IsOptional, IsDate, Min } from 'class-validator';


export class RentalsEntity {
    @IsOptional()
    @IsInt()
    rentalId?: number; // Аренда книги (primary key)

    @IsOptional()
    @IsInt()
    bookId: number; // айди книги (foreign key)

    @IsOptional()
    @IsInt()
    customerId: number; // айди пользователя (foreign key)

    @IsNotEmpty()
    @IsDate()
    dateRented: Date // Дата сдачи в аренду

    @IsNotEmpty()
    @IsDate()
    dateReturned: Date; // Дата возврата
}