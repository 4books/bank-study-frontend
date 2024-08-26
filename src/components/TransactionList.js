import React, { useState, useEffect } from 'react';
import { getTransactionList } from '../services/api';

const TransactionList = ({ accountNumber }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactionList(accountNumber);
                setTransactions(response.data);
            } catch (error) {
                console.error('거래 내역 조회 실패:', error);
            }
        };

        fetchTransactions();
    }, [accountNumber]);

    return (
        <div>
            <h2>거래 내역</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.transactionType}: {transaction.amount}원
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;