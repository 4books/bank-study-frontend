import React, { useState, useEffect } from 'react';
import { getUserAccounts, deposit, withdraw, transfer, getTransactionList } from '../services/api';

const Home = () => {
    const [accounts, setAccounts] = useState([]);
    const [fullname, setFullname] = useState('');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
    const [withdrawPassword, setWithdrawPassword] = useState('');
    const [transferAmount, setTransferAmount] = useState('');


    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await getUserAccounts();
            if (response.data && response.data.data) {
                setFullname(response.data.data.fullname);
                setAccounts(response.data.data.accounts);
            }
        } catch (error) {
            console.error('계좌 목록 조회 실패:', error);
        }
    };

    const handleAccountSelect = async (account) => {
        setSelectedAccount(account);
        try {
            const response = await getTransactionList(account.number);
            if (response.data && response.data.data && response.data.data.transactions) {
                setTransactions(response.data.data.transactions);
            }
        } catch (error) {
            console.error('거래 내역 조회 실패:', error);
        }
    };

    const handleDeposit = async () => {
        try {
            await deposit({
                number: selectedAccount.number,
                amount: parseInt(amount),
                tel: tel || "없음"
            });
            alert('입금 성공');
            fetchAccounts();
            handleAccountSelect(selectedAccount);
            setAmount('');
            setTel('');
        } catch (error) {
            console.error('입금 실패:', error);
            alert('입금 실패');
        }
    };

    const handleWithdraw = async () => {
        if (!selectedAccount) {
            alert('계좌를 선택해주세요.');
            return;
        }
        if (!amount || amount <= 0) {
            alert('올바른 금액을 입력해주세요.');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        try {
            await withdraw({
                number: selectedAccount.number,
                amount: parseInt(amount),
                password: password,
                gubun: 'WITHDRAW'
            });
            alert('출금 성공');
            fetchAccounts();
            handleAccountSelect(selectedAccount);
            setAmount('');
            setPassword('');
        } catch (error) {
            console.error('출금 실패:', error);
            if (error.response && error.response.data && error.response.data.msg) {
                alert(`출금 실패: ${error.response.data.msg}`);
            } else {
                alert('출금 실패: 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    const handleTransfer = async () => {
        if (!selectedAccount) {
            alert('출금 계좌를 선택해주세요.');
            return;
        }
        if (!toAccount) {
            alert('입금 계좌번호를 입력해주세요.');
            return;
        }
        if (!transferAmount || transferAmount <= 0) {
            alert('올바른 이체 금액을 입력해주세요.');
            return;
        }
        if (!withdrawPassword) {
            alert('출금 계좌의 비밀번호를 입력해주세요.');
            return;
        }

        try {
            await transfer({
                withdrawNumber: selectedAccount.number,
                depositNumber: toAccount,
                amount: parseInt(transferAmount),
                withdrawPassword: withdrawPassword,
                gubun: 'TRANSFER'
            });
            alert('이체 성공');
            fetchAccounts();
            handleAccountSelect(selectedAccount);
            setTransferAmount('');
            setToAccount('');
            setWithdrawPassword('')
        } catch (error) {
            console.error('이체 실패:', error);
            if (error.response && error.response.data && error.response.data.msg) {
                alert(`이체 실패: ${error.response.data.msg}`);
            } else {
                alert('이체 실패: 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl font-semibold mb-6">계좌 관리</h1>
                    <h2 className="text-xl mb-4">{fullname}님의 계좌 목록</h2>

                    {accounts.length > 0 ? (
                        <ul className="mb-6">
                            {accounts.map(account => (
                                <li
                                    key={account.id}
                                    onClick={() => handleAccountSelect(account)}
                                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                >
                                    계좌번호: {account.number}, 잔액: {account.balance}원
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">계좌가 없거나 데이터를 불러오는 중입니다.</p>
                    )}

                    {selectedAccount && (
                        <div className="mt-6">
                            <h2 className="text-xl mb-4">선택된 계좌: {selectedAccount.number}</h2>
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="금액"
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    placeholder="전화번호"
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호"
                                    className="border p-2 rounded"
                                />
                                <div className="flex space-x-2">
                                    <button onClick={handleDeposit}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">입금
                                    </button>
                                    <button onClick={handleWithdraw}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">출금
                                    </button>
                                </div>
                                <h3 className="text-lg font-semibold mt-4">이체</h3>
                                <input
                                    type="text"
                                    value={toAccount}
                                    onChange={(e) => setToAccount(e.target.value)}
                                    placeholder="입금 계좌번호"
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="number"
                                    value={transferAmount}
                                    onChange={(e) => setTransferAmount(e.target.value)}
                                    placeholder="이체 금액"
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="password"
                                    value={withdrawPassword}
                                    onChange={(e) => setWithdrawPassword(e.target.value)}
                                    placeholder="출금 계좌 비밀번호"
                                    className="border p-2 rounded"
                                />
                                <button
                                    onClick={handleTransfer}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    이체
                                </button>
                            </div>

                            <h3 className="text-xl mt-6 mb-4">거래 내역</h3>
                            {transactions.length > 0 ? (
                                <ul className="space-y-2">
                                    {transactions.map(transaction => (
                                        <li key={transaction.id} className="bg-gray-50 p-2 rounded">
                                            {transaction.gubun}: {transaction.amount}원 -
                                            보낸이: {transaction.sender}, 받는이: {transaction.receiver},
                                            잔액: {transaction.balance}원, 일시: {transaction.createdAt}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">거래 내역이 없거나 데이터를 불러오는 중입니다.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;