import React from 'react';

const AccountItem = ({ account, onDelete, onUpdate }) => {
    return (
        <div>
            <span>계좌번호: {account.accountNumber}, 잔액: {account.balance}</span>
            <button onClick={() => onDelete(account.id)}>삭제</button>
            <button onClick={() => onUpdate(account.id, { balance: account.balance + 100 })}>
                100원 입금
            </button>
        </div>
    );
};

export default AccountItem;