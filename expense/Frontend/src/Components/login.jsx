import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, Lock } from 'lucide-react';
import AuthContext from './authContext'; // Assuming you have AuthContext set up as previously discussed
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in both fields.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://linkerweb-01.vercel.app/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Logged in successfully!');
                login(data); // Save user data in context for session management
                navigate('/dashboard'); // Redirect to dashboard or main page
            } else {
                toast.error(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-center">Login to Expense Tracker</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 pl-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 pl-10 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 text-white rounded-md transition ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
