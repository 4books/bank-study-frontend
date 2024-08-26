import React, { useState } from 'react';
import { signup } from '../services/api';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, password, email, fullname });
            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            onSignup();
        } catch (error) {
            console.error('Signup failed:', error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="사용자 이름"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                required
            />
            <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="전체 이름"
                required
            />
            <button type="submit">회원가입</button>
        </form>
    );
};

export default Signup;