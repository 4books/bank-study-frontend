import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const login = async (loginData) => {
    try {
        const response = await api.post('/api/login', loginData);
        console.log('Login API response:', response);

        const authHeader = response.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            setToken(token);
            console.log('Token saved:', token);
        } else {
            console.error('Bearer token not found in response headers');
        }

        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const signup = (signupData) => api.post('/api/join', signupData);

// Account 관련 API
export const createAccount = (accountData) => api.post('/api/s/account', accountData);
export const deleteAccount = (number) => api.delete(`/api/s/account/${number}`);
export const getAccount = (number) => api.get(`/api/s/account/${number}`);
export const getUserAccounts = () => api.get('/api/s/account/login-user');
export const deposit = (depositData) => {
    return api.post('/api/account/deposit', {
        number: depositData.number,
        amount: depositData.amount,
        gubun: "DEPOSIT",
        tel: depositData.tel || "없음"  // tel이 제공되지 않으면 "없음"으로 설정
    });
};
export const withdraw = (withdrawData) => api.post('/api/s/account/withdraw', withdrawData);
export const transfer = (transferData) => api.post('/api/s/account/transfer', transferData);

// Transaction 관련 API
export const getTransactionList = (number) => api.get(`/api/s/account/${number}/transaction`);

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log('Sending request to:', config.url);
        console.log('With token:', token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export default api;