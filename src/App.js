import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route,
  Routes, Navigate, Outlet
} from 'react-router-dom'
import React, { useState } from 'react';

import Login from './users/Login';
import List from './news/List';
import Add from './news/Add';
import Edit from './news/Edit';
import Topic from './topic/ListTopic';
import HomeTopic from './topic/HomeTopic';
import ResetPassword from './users/ResetPassword';
import EditTopic from './topic/EditTopic';
import AddTopic from './topic/AddTopic';
import UserProfile from './users/UserProfile';



function App() {

  //đọc thông tin user tù loaclStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  // Lưu thông tin user vào loaclStorage
  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  const [user, setUser] = useState(getUserFromLocalStorage());

  //Những componet phải đăng nhập mới đc truy cập
  const ProtectedRoute = () => {
    if (user) {
      return <Outlet />
    }
    return <Navigate to="/Login" />
  }
  // những componet ko cần đăg nhập
  const PublicRoute = () => {
    if (user) {
      return <Navigate to="/" />
    }
    return <Outlet />
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorage} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<List user={user} saveUser={saveUserToLocalStorage} />} />
            <Route path="/add" element={<Add user={user} />} />
            <Route path="/edit/:id" element={<Edit user={user} />} />
            <Route path="/UserProfile" element={<UserProfile user={user} saveUser={saveUserToLocalStorage}/>} />
            <Route path="/hometopic" element={<HomeTopic />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/topic" element={<Topic />} />
            <Route path="/EditTopic" element={<EditTopic />} />
            <Route path="/AddTopic" element={<AddTopic />} />
            <Route path="/EditTopic/:id" element={<EditTopic />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
