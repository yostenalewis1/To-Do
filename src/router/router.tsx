import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "../pages/HomePage";
import React from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TasksPage from "../pages/TasksPage";
import ProtectedRoute from "../components/ProtectedRoute"; 


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />     
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={ 
             <ProtectedRoute>
                <TasksPage />
            </ProtectedRoute>}/> 
        </>
    )
);

export default router;


