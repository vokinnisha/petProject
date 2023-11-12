import { IsNotEmpty, IsInt, IsString, IsOptional, IsDate, Min } from 'class-validator';



export class BooksEntity {

    @IsOptional()
    @IsInt()
    bookId?: number; // айди книги (primary key)

    @IsNotEmpty()
    @IsString()
    title: string; // название книги

    @IsNotEmpty()
    @IsString()
    author: string; // автор

    @IsNotEmpty()
    @IsString()
    genre: string // жанр книги

    @IsNotEmpty()
    @IsDate()
    publicationYear: Date; // дата публикации

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    available: number;  // кол-во доступных
}
