import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsInt,
    IsString,
    IsOptional,
    IsDate,
    Min
} from 'class-validator';



export class BooksEntity {

    @IsOptional()
    @IsInt()
    book_id?: number; // айди книги (primary key)

    @IsNotEmpty()
    @IsString()
    title: string; // название книги

    @IsNotEmpty()
    @IsInt()
    pages: number // сколько страниц

    @IsNotEmpty()
    @IsString()
    author: string; // автор

    @IsNotEmpty()
    @IsString()
    genre: string;// жанр книги

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    publication_year: Date; // дата публикации

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    available: number;  // кол-во доступных

    @IsNotEmpty()
    @IsString()
    translation_author: string; // Кто перевел книгу, если она на английском

    @IsNotEmpty()
    @IsString()
    publisher: string; // Издательство

    @IsNotEmpty()
    @IsInt()
    price: number; // стоимость

    @IsNotEmpty()
    @IsString()
    description: string; // описание книги

}
