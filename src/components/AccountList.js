import React from 'react';

const AccountList = ({ accounts }) => {
    return (
        <div>
            <h2>계좌 목록</h2>
            <ul>
                {accounts.map(account => (
                    <li key={account.id}>
                        계좌번호: {account.accountNumber}, 잔액: {account.balance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountList;