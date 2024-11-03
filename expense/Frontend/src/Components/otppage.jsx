import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpPage() { // Removed email from props
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(''); // Manage email through state

    useEffect(() => {
        // Retrieve email from local storage
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            toast.error('Email not found. Please signup again.');
            // Optionally, redirect to signup page if email is not found
            // navigate('/signup');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error('Please enter the OTP.');
            return;
        }

        if (otp.length !== 6) {
            toast.error('OTP must be 6 digits.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://linkerweb-01.vercel.app/api/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('OTP verified successfully!');
                // Redirect or take further action upon successful verification
                // For example, navigate to another page or show a success message
            } else {
                toast.error(data.error || 'OTP verification failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during OTP verification:', err);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://linkerweb-01.vercel.app/api/auth/resend-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'OTP resent successfully!');
            } else {
                toast.error(data.error || 'Failed to resend OTP. Please try again.');
            }
        } catch (err) {
            console.error('Error during OTP resend:', err);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-bold text-center">Enter OTP</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter the OTP"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-2 text-white ${loading ? 'bg-gray-500' : 'bg-blue-500'} rounded-md hover:bg-blue-600 transition`}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Didn't receive the OTP?
                    <button
                        onClick={handleResendOTP}
                        className="text-blue-500 hover:underline"
                        disabled={loading}
                    >
                        Resend
                    </button>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default OtpPage;
