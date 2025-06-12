import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Create from "./Pages/Posts/Create";
import Show from "./Pages/Posts/Show";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        await axios.get("https://laravel-backend-production-703c.up.railway.app/api/user"); // ✅ Check if user is logged in
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false); // ❌ User is logged out
        console.error(error);
        
      }
    }

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // 👀 Prevents flickering while checking auth

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};


const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        await axios.get("https://laravel-backend-production-703c.up.railway.app/api/user"); // ✅ Check if user is logged in
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false); // ❌ User is logged out
        console.log(error);
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // 👀 Prevents flickering while checking auth

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
          <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
          <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />

          <Route path="/posts/:id" element={<Show />} />          
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
