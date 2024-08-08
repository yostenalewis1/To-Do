import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg w-96 p-16 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Welcome to the To-Do List App</h1>
      <p className="text-gray-700 mb-6">
        Manage your tasks efficiently and keep track of everything with ease.
      </p>
      <div className="space-y-4">
        <Link 
          to="/login" 
          className="block text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 text-lg font-semibold transition duration-200"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="block text-white bg-green-500 hover:bg-green-600 rounded-lg py-2 px-4 text-lg font-semibold transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
