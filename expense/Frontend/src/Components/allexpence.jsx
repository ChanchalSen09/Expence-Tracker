import React, { useEffect, useState } from 'react';
import { IndianRupee } from 'lucide-react'; // Assuming you are using Lucide icons

const ExpenseHistoryPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 3 }, (_, i) => currentYear - i);

    useEffect(() => {
        const fetchData = () => {
            const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
            const categoriesData = JSON.parse(localStorage.getItem('categories')) || [];

            setExpenses(expensesData);
            setCategories(categoriesData);
        };

        fetchData();
    }, []);

    const getFilteredExpenses = () => {
        return expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            const monthMatches = !selectedMonth || expenseDate.getMonth() === parseInt(selectedMonth);
            const yearMatches = !selectedYear || expenseDate.getFullYear() === parseInt(selectedYear);
            const categoryMatches = !selectedCategory || expense.category === selectedCategory;

            // Check if expense is within date range
            const fromDateMatches = !fromDate || expenseDate >= new Date(fromDate);
            const toDateMatches = !toDate || expenseDate <= new Date(toDate);

            return monthMatches && yearMatches && categoryMatches && fromDateMatches && toDateMatches;
        });
    };

    const filteredExpenses = getFilteredExpenses();

    const resetFilters = () => {
        setSelectedCategory('');
        setSelectedMonth('');
        setSelectedYear('');
        setFromDate('');
        setToDate('');
    };

    return (
        <div className="container mx-auto p-6 h-full">
            <h1 className="text-4xl font-bold text-center mb-8">Expense History</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Filter Expenses</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="">Select Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="">Select Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                    <button
                        onClick={() => getFilteredExpenses()}
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={resetFilters}
                        className="bg-gray-300 text-black p-3 rounded-md hover:bg-gray-400 transition"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            <div className="bg-gray-200 p-6 rounded-md shadow-md mb-8 overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Filtered Expenses</h2>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border p-3 text-left">ID</th>
                            <th className="border p-3 text-left">Date</th>
                            <th className="border p-3 text-left">Category</th>
                            <th className="border p-3 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">No expenses found.</td>
                            </tr>
                        ) : (
                            filteredExpenses.map((expense, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className="border p-3 text-center">{index + 1}</td>
                                    <td className="border p-3 text-center">{new Date(expense.date).toLocaleDateString()}</td>
                                    <td className="border p-3 text-center">{expense.category}</td>
                                    <td className="border p-3 text-center">{expense.amount.toFixed(2)} <IndianRupee size={16} className="inline-block align-middle" /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseHistoryPage;
