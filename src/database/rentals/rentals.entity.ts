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

    @IsString()
    @IsNotEmpty()
    // @IsDate()
    dateRented: string; // Дата сдачи в аренду

    @IsString()
    @IsNotEmpty()
    // @IsDate()
    dateReturned: string; // Дата возврата
}