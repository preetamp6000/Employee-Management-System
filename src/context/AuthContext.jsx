import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS, initializeDemoData } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data and load from localStorage
  useEffect(() => {
    initializeDemoData();
    
    const storedUsers = storage.get(STORAGE_KEYS.USERS) || [];
    const storedTasks = storage.get(STORAGE_KEYS.TASKS) || [];
    const storedUser = storage.get(STORAGE_KEYS.CURRENT_USER);

    setUsers(storedUsers);
    setTasks(storedTasks);
    
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    
    setLoading(false);
  }, []);

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      storage.set(STORAGE_KEYS.USERS, users);
      storage.set(STORAGE_KEYS.TASKS, tasks);
      if (currentUser) {
        storage.set(STORAGE_KEYS.CURRENT_USER, currentUser);
      } else {
        storage.remove(STORAGE_KEYS.CURRENT_USER);
      }
    }
  }, [users, tasks, currentUser, loading]);

  // Auth functions
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'User already exists with this email' };
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: 'employee',
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true, user: newUser };
  };

  // Task functions
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getTasksForUser = (userId) => {
    return tasks.filter(task => task.assignedTo === userId);
  };

  const getTaskStatistics = () => {
    const total = tasks.length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const completed = tasks.filter(task => task.status === 'completed').length;

    return { total, pending, inProgress, completed };
  };

  const value = {
    currentUser,
    users,
    tasks,
    loading,
    login,
    logout,
    register,
    addTask,
    updateTask,
    deleteTask,
    getTasksForUser,
    getTaskStatistics
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};