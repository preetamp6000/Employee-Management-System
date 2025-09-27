import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Task Manager</h1>
            <span className="ml-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
              {currentUser?.role === 'admin' ? 'Admin' : 'Employee'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {currentUser?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;