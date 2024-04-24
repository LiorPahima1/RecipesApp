import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationPage.css';

const RegistrationPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const register = () => {
        axios.post("http://localhost:3001/register", { name, email, password })
            .then((response) => {
                console.log(response);
                navigate('/');
            })
            .catch((error) => {
                console.error('Registration failed:', error);
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

        register();
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                <div className="registration-box">
                    <div className="registration-header">Register</div>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="register-button" type="submit">Register</button>
                        <Link to="/" className="back-to-login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistrationPage;
