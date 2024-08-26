import React, { useState } from 'react';
import { login, getToken } from '../services/api';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            const token = getToken();
            if (token) {
                console.log('Login successful, token received and saved');
                onLogin();
            } else {
                console.error('Login successful but no token saved');
                alert('로그인은 성공했지만 토큰을 받지 못했습니다.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인에 실패했습니다.');
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
            <button type="submit">로그인</button>
        </form>
    );
};

export default Login;