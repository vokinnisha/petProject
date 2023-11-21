import {
    IsNotEmpty,
    IsInt,
    IsString,
    IsOptional,
    IsDate,
    Min
} from 'class-validator';


export class CustomersEntity {

    @IsOptional()
    @IsInt()
    customer_id?: string; // айди пользователя (Primary key)

    @IsNotEmpty()
    @IsString()
    first_name: string; // Имя

    @IsNotEmpty()
    @IsString()
    last_name: string; // фамилия

    @IsNotEmpty()
    @IsString()
    email: string; // почта

    @IsNotEmpty()
    @IsString()
    phone: string; // телефон

    @IsNotEmpty()
    @IsString()
    social_login: string;  // Логин соц-сети

    @IsNotEmpty()
    @IsString()
    birth_date: string;
}