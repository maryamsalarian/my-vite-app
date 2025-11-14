import { useState } from 'react';
// import { users } from '../../data/Users';
// import { validateLogin } from './LoginFormUtils';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    {
        /*
        useNavigate is an idomatic hook
        useNavigate is fully typed in React Router v.6+
        inferred type is: NavigateFunction
        type NavigateFunction = (
        to: To | number,
        options?: { replace?: boolean; state?: any }
        ) => void;
         */
    }

    const navigate = useNavigate();

    {
        /* 
        // local user-password validation
        const handleSubmit = (e: React.FormEvent) => {
        // stops the page from refreshing when form is submitted
        e.preventDefault();

        if (!validateLogin(username, password, users)) {
            setError('Invalid username or password.');
            return;
        }

        setError('');
        navigate('/about');
    };
    */
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `https://jsonplaceholder.typicode.com/users`;
            const response = await fetch(url);
            if (!response)
                throw new Error(
                    `Response error when fetching users: ${response}`,
                );
            const users = await response.json();
            const user = users.find(
                (user: { email: string }) =>
                    user.email.toLowerCase() === username.toLowerCase(),
            );
            if (!user) {
                setError('Invalid username or password.');
                return;
            }
            const expectedPassword = `${user.address.zipcode.split('-')[0]}${
                user.address.city.split(' ')[0]
            }`; //first part of zipcode + first word of city if multi-word
            if (password !== expectedPassword) {
                setError('Invalid username or password.');
                return;
            }
            setError('');
            navigate('/about');
        } catch (error) {
            console.log('Login error: ', error);
            setError('Invalid username or password.');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username" className="username-label">
                <span>Username</span>
                <input
                    className="username-input-field"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label htmlFor="password" className="password-label">
                <span>Password</span>
                <input
                    className="password-input-field"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <div className="login-action">
                <button className="login-btn" type="submit">
                    Login
                </button>
            </div>
            <p className="login-error">{error || ' '}</p>
        </form>
    );
};

export default LoginForm;
