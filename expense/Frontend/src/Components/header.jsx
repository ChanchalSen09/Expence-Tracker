import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Lucide icons for hamburger and close icons
import AuthContext from './authContext'; // Adjust the path as necessary

function Header() {
    const { user, loading } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <header className="bg-blue-700 shadow-md relative">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-3xl font-bold text-white">Expense Tracker</h1>

                {/* Hamburger Icon */}
                <button
                    className="text-white md:hidden"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                            >
                                Home
                            </Link>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/expense-history"
                                        className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                    >
                                        All Expenses
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                to="/login"
                                className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                            >
                                Signup
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden absolute top-full left-0 w-full bg-blue-700 shadow-md z-50">
                        <ul className="flex flex-col space-y-4 p-4">
                            <li>
                                <Link
                                    to="/"
                                    onClick={toggleMenu}
                                    className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                >
                                    Home
                                </Link>
                            </li>
                            {user && (
                                <>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            onClick={toggleMenu}
                                            className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/expense-history"
                                            onClick={toggleMenu}
                                            className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                        >
                                            All Expenses
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    to="/login"
                                    onClick={toggleMenu}
                                    className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signup"
                                    onClick={toggleMenu}
                                    className="text-white hover:text-blue-300 transition duration-200 ease-in-out"
                                >
                                    Signup
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
