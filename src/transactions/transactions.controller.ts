import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

interface TransactionInterface {
    fromAddres: string;
    toAddress: string;
    value: number;
    date: Date;
}

class Transaction implements TransactionInterface {
    fromAddres!: string;
    toAddress!: string;
    value!: number;
    date!: Date;

    constructor(fromAddres: string, toAddress: string, value: number, date: Date) {
        this.fromAddres = fromAddres;
        this.toAddress = toAddress;
        this.value = value;
        this.date = date;
    }

}

declare const transaction: Transaction;

@Controller('/transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get()
    async getTransactions(): Promise<Array<Transaction>> {
        return await this.transactionsService.getAllTransactions();
    }

    @Get('/balance')
    async getBalanceByDate(@Query('fromDate') fromDate: Date = new Date(-8640000000000000), @Query('toDate') toDate: Date = new Date(8640000000000000)): Promise<number> {
        return await this.transactionsService.getBalanceByDate(new Date(fromDate), new Date(toDate));
    }

}

