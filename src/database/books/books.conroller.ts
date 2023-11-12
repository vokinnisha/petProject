import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksEntity } from './books.entity';

@Controller('books')
export class BooksController {
    constructor(
        private readonly booksService: BooksService
    ) { }

    @Post()
    async create(@Body() createBookDto: BooksEntity) {
        try {
            return await this.booksService.addBook(createBookDto);
        } catch (error) {
            return error.message
        }
    }

    @Get('get-book/:bookId')
    async getBook(@Param('bookId') bookId: number) {
        try {
            return await this.booksService.getBook(bookId);
        } catch (error) {
            return error.message
        }
    }
}
