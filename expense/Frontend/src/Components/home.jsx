import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './home.css'; // Add your custom styles if needed

const Home = () => {
    return (
        <div className="home-page min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="hero relative h-screen w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/12/43/55/360_F_512435502_AtoI7IaRsM1JVwA8xvyfQWiZPMVlZwX4.jpg")' }}>
                <div className="overlay absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white p-4">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl font-bold mb-4"
                    >
                        Welcome to Our Platform
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-xl mb-8"
                    >
                        Your one-stop solution for managing your finances and tracking your expenses.
                    </motion.p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition"
                            >
                                Sign Up
                            </motion.button>
                        </Link>
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-lg hover:bg-gray-900 transition"
                            >
                                Login
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about py-12 bg-gray-50 text-center">
                <h2 className="text-3xl font-semibold mb-4">About Us</h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                    We are dedicated to helping you achieve financial stability and peace of mind. Our platform provides the tools you need to track your expenses, set a budget, and manage your financial goals effectively.
                </p>
                <img src="https://8allocate.com/wp-content/uploads/2019/08/How-to-Build-a-Top-Notch-AI-Software-Development-Team.jpg" alt="Our Team" className="mx-auto rounded-lg shadow-lg w-max h-96" />
            </section>

            {/* Features Section */}
            <section className="features py-12 bg-white text-center">
                <h2 className="text-3xl font-semibold mb-8">Our Key Features</h2>
                <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 shadow-md rounded-lg"
                    >
                        <img src="https://media.licdn.com/dms/image/D5612AQGplp7JKG6Iiw/article-cover_image-shrink_720_1280/0/1673950361361?e=2147483647&v=beta&t=NxzErCoXqQ-xwkHJZZkKGKYNA21hJh3oNMUJzNKQr9M" alt="Feature 1" className="mx-auto mb-4 h-48 w-48 rounded-lg" />
                        <h3 className="text-xl font-bold mb-2">Expense Tracking</h3>
                        <p className="text-gray-700">Keep track of your daily expenses and manage your budget effectively.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="p-6 shadow-md rounded-lg"
                    >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvgFBiAqGNTwIt_9yXEBuaFgqhW627ikOy_A&s" alt="Feature 2" className="mx-auto mb-4 rounded-lg" />
                        <h3 className="text-xl font-bold mb-2">Financial Insights</h3>
                        <p className="text-gray-700">Gain valuable insights into your spending habits and improve your finances.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="p-6 shadow-md rounded-lg"
                    >
                        <img src="https://img.freepik.com/free-vector/budgeting-concept-idea-financial-planning-wellbeing-currency-balance-income-money-allocation-isolated-flat-illustration-vector_613284-1084.jpg" alt="Feature 3" className="mx-auto mb-4 w48 h-48 rounded-lg" />
                        <h3 className="text-xl font-bold mb-2">Budget Planning</h3>
                        <p className="text-gray-700">Set your financial goals and stick to a budget that works for you.</p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials py-12 bg-gray-50 text-center">
                <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
                <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 shadow-md rounded-lg"
                    >
                        <p className="text-gray-700 italic">"This platform has transformed my financial life! I can now see exactly where my money goes."</p>
                        <h4 className="mt-4 font-semibold">- Sarah K.</h4>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="p-6 shadow-md rounded-lg"
                    >
                        <p className="text-gray-700 italic">"Easy to use and packed with features. It's the only finance tool I need."</p>
                        <h4 className="mt-4 font-semibold">- John M.</h4>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="p-6 shadow-md rounded-lg"
                    >
                        <p className="text-gray-700 italic">"Thanks to this app, I managed to save more and control my spending habits."</p>
                        <h4 className="mt-4 font-semibold">- Emily R.</h4>
                    </motion.div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta py-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-semibold mb-4"
                >
                    Start Your Financial Journey Today!
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-8"
                >
                    Sign up now to take control of your finances and unlock your financial potential.
                </motion.p>
                <Link to="/signup">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
                    >
                        Get Started
                    </motion.button>
                </Link>
            </section>

            {/* Contact Us Section */}
            <section className="contact py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-8">Have questions? Reach out to us, and we’ll be happy to help!</p>
                <form className="max-w-xl mx-auto space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md" />
                    <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md" />
                    <textarea placeholder="Your Message" className="w-full px-4 py-2 border rounded-md" rows="4"></textarea>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Home;
