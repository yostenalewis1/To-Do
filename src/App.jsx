// src/App.js
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router'; // Adjust the path as necessary

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
