import React, { useState } from 'react';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/login", {
                username,
                password
            }, { withCredentials: true });
            if (res.data.success) {
                toast.success('🎉 Login successful!', {
                    position: "top-center",
                    autoClose: 1000,
                    theme: "colored",
                }
            );
            navigate('/dashboard')
        } else {
                toast.error(`❌ ${res.data.message || 'Invalid credentials'}`, {
                    position: "top-center",
                    autoClose: 1000,
                    theme: "colored",
                });
            }
        } catch (err) {
            let errorMessage = 'Failed to connect to server';
            if (err.response) {
                errorMessage = err.response.data.message || 'Login failed';
            }
            
            toast.error(`❌ ${errorMessage}`, {
                position: "top-center",
                autoClose: 1000,
                theme: "colored",
            });
            
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-page'>
            <h2>Employee Management System</h2>
        <div className='login-container'>
            <div className="login-content">
            <h3 className="welcome-text">Welcome Back 👋</h3>
            <p className="subtitle">Please sign in to continue</p>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='input-groups'>
                    <p>Username:</p>
                    <input 
                    type = "text"
                    value = {username}
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder='Username'
                    />
                </div>

                <div className='input-groups'>
                    <p>Password:</p>
                    <input
                    type = 'password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    />
                </div>
                <button type="submit" className= 'signin' disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
                </button>
                <div className='sign'>
                <Link to = '/Signup' className='signup'>Create Account</Link>
                <Link to="/dashboard" className="skip">Skip For Now</Link>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Login