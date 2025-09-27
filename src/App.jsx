import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoadingScreen from './components/LoadingScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

const AppRoutes = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!currentUser ? <Login /> : <Navigate to={currentUser.role === 'admin' ? '/admin' : '/employee'} replace />} 
      />
      <Route 
        path="/register" 
        element={!currentUser ? <Register /> : <Navigate to={currentUser.role === 'admin' ? '/admin' : '/employee'} replace />} 
      />
      <Route 
        path="/admin" 
        element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/employee" 
        element={
          <PrivateRoute requiredRole="employee">
            <EmployeeDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to={currentUser ? (currentUser.role === 'admin' ? '/admin' : '/employee') : '/login'} replace />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;