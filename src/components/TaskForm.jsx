import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addTask } from '../services/taskService';

const TaskForm = ({ fetchTasks }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      priority: 'low',
      dueDate: '',
      status: 'pending',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      priority: Yup.string().required('Required'),
      dueDate: Yup.date().required('Required'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      if (user) {
        await addTask({ ...values, userId: user.id });
        fetchTasks();    
      }
      setSubmitting(false);
    },
  });
  
  const handleLogout = () => {
    localStorage.removeItem('user');  
    window.location.href = '/'; 
  };
 
  return (
    <form onSubmit={formik.handleSubmit} className="bg-gray-300 shadow-md rounded-lg p-4 border border-gray-200  ">
      <h2 className="text-red-800 font-bold text-lg mb-4 font-serif">Your To-Do list</h2> 
      <div className='grid md:grid-cols-3 sm:grid-cols-2'>
      <div className="mb-3">
        <label className="block text-gray-700 text-md font-serif">Name</label>
        <input
          className="border border-gray-400 p-1 rounded-lg w-auto text-sm"
          type="text"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-md font-serif">Description</label>
        <input
          className="border border-gray-400 p-1 rounded-lg w-auto text-sm"
          type="text"
          {...formik.getFieldProps('description')}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-md font-serif">Priority</label>
        <select {...formik.getFieldProps('priority')} className="border border-gray-400 p-1 rounded-lg w-auto text-sm">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700  text-md font-serif ">Due Date</label>
        <input
          type="date"
          {...formik.getFieldProps('dueDate')}
          className="border border-gray-400 p-1 rounded-lg w-auto text-sm"
        />
        {formik.touched.dueDate && formik.errors.dueDate ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.dueDate}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 text-md font-serif">Status</label>
        <select {...formik.getFieldProps('status')} className="border border-gray-400 p-1 rounded-lg w-auto text-sm">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
   </div>
      <div className='flex justify-between'>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-lg text-sm mt-2">
          Add Task
        </button>
        <button
          onClick={handleLogout}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-sm"
        >
          Logout
        </button> 
      </div>
     
    </form>
  );
  
   
};

export default TaskForm;
