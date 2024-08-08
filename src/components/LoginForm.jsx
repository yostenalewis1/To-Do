import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required( 'username is required'),
      password: Yup.string().required(' password is required'),
    }),

    
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Submitting form:', values);
      const user = await login(values.username, values.password);
      console.log('Received user:', user); 
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/tasks');
      } else {
        alert('Invalid username or password');
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Username</label>
      <input
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        type="text"
        {...formik.getFieldProps('username')}
      />
      {formik.touched.username && formik.errors.username ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
      ) : null}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        type="password"
        {...formik.getFieldProps('password')}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
      ) : null}
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Login
    </button>
  </form>
);
};

export default LoginForm;