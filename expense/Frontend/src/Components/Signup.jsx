import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ username, email, password, confirmPassword });
        if (!username || !email || !password || !confirmPassword) {
            toast.error('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                username,
                email,
                password,
            });
            console.log('Signup response:', response.data);
            localStorage.setItem('userEmail', email);
            toast.success('Signup successful! Check your email for the OTP.');
            setTimeout(() => {
                navigate('/otp');
            }, 4000);
        } catch (error) {
            handleSignupError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignupError = (error) => {
        if (error.response) {
            const errorMessage = error.response.data.message;
            if (errorMessage === "User already exists") {
                toast.error('This email is already registered. Please verify your email or use another email.');
                promptEmailVerification();
            } else {
                toast.error(errorMessage || 'Signup failed. Please try again.');
            }
        } else if (error.request) {
            toast.error('No response from server. Please try again later.');
        } else {
            toast.error('An error occurred. Please try again later.');
        }
    };

    const promptEmailVerification = async () => {
        const userConfirmed = window.confirm('Do you want to verify your email now?');
        if (userConfirmed) {
            try {
                await axios.post("http://localhost:3000/api/auth/resend-otp", { email });
                toast.success('OTP sent to your email. Please check your inbox.');
                navigate('/otp');
            } catch (otpError) {
                toast.error('Failed to send OTP. Please try again later.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-center">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <PasswordField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        placeholder="Enter your password"
                    />
                    <PasswordField
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        showPassword={showConfirmPassword}
                        setShowPassword={setShowConfirmPassword}
                        placeholder="Confirm your password"
                    />
                    <button
                        type="submit"
                        className={`w-full p-2 text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'} rounded-md hover:bg-blue-600 transition`}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

function InputField({ label, value, onChange, type = 'text', placeholder, required = false }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}

function PasswordField({ label, value, onChange, showPassword, setShowPassword, placeholder }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={placeholder}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
}

export default Signup;
