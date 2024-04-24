import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginPageProps {
    onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const login = () => {
        axios.post("http://localhost:3001/login", { email, password })
            .then((response) => {
                console.log(response);
                if (response.data === 'Login successful') {
                    onLogin(email);
                    localStorage.setItem("userEmail", email);
                    navigate('/recipes-account');
                } else {
                    setErrorMessage(response.data);
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setErrorMessage(error.response.data);
            });
    };

    const isValidEmail = (email: string): boolean => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        login();
    };

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div className="LoginBox">
                    <div className="LoginHeader">Login</div>
                    <div className="inputs">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="submitbutton1" type="submit">Login</button>
                        <Link to="/register" className="submitbutton2">Register</Link>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
