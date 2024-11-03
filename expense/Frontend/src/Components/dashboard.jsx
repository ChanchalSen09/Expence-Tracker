import React, { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react'; // Assuming you are using Lucide icons

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState(['Food', 'Transport', 'Entertainment']);
    const [newCategory, setNewCategory] = useState('');

    const staticCategories = ['Rent', 'Utilities', 'Groceries'];

    // Load expenses and categories from local storage when the component mounts
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(storedExpenses);

        const storedCategories = JSON.parse(localStorage.getItem('categories')) || staticCategories;
        setCategories(storedCategories);
    }, []);

    const addExpense = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newExpense = {
            date: formData.get('date'),
            amount: parseFloat(formData.get('amount')),
            category: formData.get('category')
        };

        if (isNaN(newExpense.amount) || newExpense.amount <= 0) {
            alert("Please enter a valid amount greater than zero.");
            return;
        }

        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);

        // Store updated expenses in local storage
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

        e.target.reset();
    };

    const removeExpense = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);

        // Update local storage
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    };

    const addCategory = (e) => {
        e.preventDefault();
        const trimmedCategory = newCategory.trim();
        const allCategories = [...staticCategories, ...categories]; // Combine static and dynamic categories

        if (trimmedCategory && !allCategories.includes(trimmedCategory)) {
            const updatedCategories = [...categories, trimmedCategory];
            setCategories(updatedCategories);
            setNewCategory('');
            // Store updated categories in local storage
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
        } else {
            alert("This category already exists.");
        }
    };

    const removeCategory = (category) => {
        if (!staticCategories.includes(category)) {
            const updatedCategories = categories.filter(c => c !== category);
            setCategories(updatedCategories);
            // Update local storage
            localStorage.setItem('categories', JSON.stringify(updatedCategories));
        }
    };

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const totalSpent = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Expense Tracker</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Add New Expense Form */}
                <form onSubmit={addExpense} className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="date"
                            name="date"
                            required
                            className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            required
                            min="0"
                            className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <select
                            name="category"
                            required
                            className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">Select Category</option>
                            {[...new Set([...staticCategories, ...categories])].map((category, index) => ( // Use Set to avoid duplicates
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Add Expense
                        </button>
                    </div>
                </form>

                {/* Add New Category Form */}
                <form onSubmit={addCategory} className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New Category"
                            className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            {/* This Month's Spending Summary */}
            <div className="bg-gray-200 p-6 rounded-md shadow-md mb-8 overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">This Month's Spending</h2>
                <p className="mb-4">Total Spent: <span className="font-bold">{totalSpent} <IndianRupee size={16} className="inline-block align-middle" /></span></p>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border p-3 text-left">ID</th>
                            <th className="border p-3 text-left">Date</th>
                            <th className="border p-3 text-left">Category</th>
                            <th className="border p-3 text-left">Amount</th>
                            <th className="border p-3 text-left">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">No expenses added this month yet.</td>
                            </tr>
                        ) : (
                            filteredExpenses.map((expense, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                    <td className="border p-3 text-center">{index + 1}</td>
                                    <td className="border p-3 text-center">{expense.date}</td>
                                    <td className="border p-3 text-center">{expense.category}</td>
                                    <td className="border p-3 text-center">{expense.amount.toFixed(2)} <IndianRupee size={16} className="inline-block align-middle" /></td>
                                    <td className="border p-3 text-center">
                                        <button
                                            onClick={() => removeExpense(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            {/* Category List */}
            {/* Category List */}
            <div className="bg-gray-200 p-6 rounded-md shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <ul className="space-y-2">
                    {/* Render static categories separately */}
                    {staticCategories.map((category, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{category}</span>
                        </li>
                    ))}
                    {/* Render user-added categories */}
                    {Array.from(new Set(categories)).map((category, index) => ( // Use Set to avoid duplicates
                        <li key={index} className="flex justify-between items-center">
                            <span>{category}</span>
                            {!staticCategories.includes(category) && (
                                <button
                                    onClick={() => removeCategory(category)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Dashboard;
