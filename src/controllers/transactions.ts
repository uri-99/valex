import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import Web3 from 'web3';

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

const valex_wallet = '0x263b3ff55b4369d6e8900b6225fe5932e3073cc1';

const apiCall = async (fromDate: Date = new Date(-8640000000000000), toDate: Date = new Date(-8640000000000000)) => {

    // get some posts
    let result: AxiosResponse = await axios.get(`https://deep-index.moralis.io/api/v2/0x263b3ff55B4369D6E8900b6225fE5932e3073Cc1?chain=eth`, { headers: { 'X-API-Key': 'wCTR6N5592oErBiwE08tiUUnCOWtOp9jPVM3UX9MQSvWZ4eq0tYyO32nM4AfKufx' } });

    let transactions: Array<Transaction> = []

    for (let i = 0; i < result.data.result.length; i++) {
        let transaction = new Transaction(result.data.result[i].from_address, result.data.result[i].to_address, parseFloat(Web3.utils.fromWei(result.data.result[i].value, 'ether')), new Date(result.data.result[i].block_timestamp));

        if (transaction.date > fromDate && transaction.date < toDate && transaction.toAddress.match(valex_wallet)) {
            transactions.push(transaction);
        }

    }

    return transactions;

};

const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {

    let transactions = await apiCall();

    return res.status(200).json({
        message: transactions
    });
};

const getBalanceByDate = async (req: Request, res: Response, next: NextFunction) => {

    let queryFromDate = new Date(-8640000000000000);
    let queryToDate = new Date(8640000000000000);

    if (req.query.fromDate) {
        queryFromDate = new Date(req.query.fromDate as string);
    } else if (req.query.fromDate) {
        queryToDate = new Date(req.query.toDate as string);
    }
    let transactions = await apiCall(queryFromDate, queryToDate);

    let ethInMonth = transactions.reduce(function (tot, record) {
        return tot + record.value;
    }, 0);

    return res.status(200).json({
        message: ethInMonth
    });
};

export default { getAllTransactions, getBalanceByDate };