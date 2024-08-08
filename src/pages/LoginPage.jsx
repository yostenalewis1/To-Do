import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg w-96 p-16">
      <h1 className="text-2xl font-bold text-blue-500 text-center">Login</h1>
      <LoginForm />
     <p>
      <Link to="/register" className="text-blue-500 ">Create an account</Link>
     </p>
     <p>
     </p>
    </div> 
  </div>
);

export default LoginPage;
