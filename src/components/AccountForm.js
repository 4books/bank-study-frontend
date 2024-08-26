import React, { useState } from 'react';

const AccountForm = ({ onSubmit }) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [balance, setBalance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ accountNumber, balance: parseFloat(balance) });
        setAccountNumber('');
        setBalance('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="계좌번호"
                required
            />
            <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="초기 잔액"
                required
            />
            <button type="submit">계좌 생성</button>
        </form>
    );
};

export default AccountForm;