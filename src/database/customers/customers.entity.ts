import { IsNotEmpty, IsInt, IsString, IsOptional, IsDate, Min } from 'class-validator';


export class CustomersEntity {
    @IsOptional()
    @IsInt()
    customerId: number; // айди пользователя (Primary key)

    @IsNotEmpty()
    @IsString()
    firstName: string; // Имя

    @IsNotEmpty()
    @IsString()
    lastName: string; // фамилия

    @IsNotEmpty()
    @IsString()
    email: string; // почта

    @IsNotEmpty()
    @IsString()
    phone: string; // телефон

    @IsNotEmpty()
    @IsString()
    socialLogin: string;  // Логин соц-сети

    @IsNotEmpty()
    @IsString()
    birthDate: string;
}