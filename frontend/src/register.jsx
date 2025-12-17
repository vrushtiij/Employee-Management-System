import React, { useState } from 'react';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("❌ Passwords do not match", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }

        if (password.length < 6) {
            toast.error("❌ Password must be at least 6 characters", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post("https://your-backend.up.railway.app/register", {
                username,
                password
            });
            if (res.data.success) {
                toast.success('🎉 Registered successful! Redirecting...', {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
            } else {
                toast.error(`❌ ${res.data.message || 'Invalid credentials'}`, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        } catch (err) {
            let errorMessage = 'Failed to connect to server';
            if (err.response) {
                errorMessage = err.response.data.message || 'register failed';
            }
            
            toast.error(`❌ ${errorMessage}`, {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });
            
            console.error('register error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='register-page'>
            <h2>Employee Management System</h2>
        <div className='register-container'>
            <div className="register-content">
            <h3 className="welcome-text">Welcome</h3>
            <p className="subtitle">Create Your Account</p>
            <form className='register-form' onSubmit={handleSubmit}>
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

                <div className='input-groups'>
                    <p>Confirm Password:</p>
                    <input 
                    type = "password"
                    value = {confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    />
                </div>
                </div>
                <button type="submit" className= 'signin' disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
                </button>
                <div className='sign'>
                <Link to= '/' className='signup'>Already have an account?</Link>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Register