import React from 'react';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';
import SingleQuestion from './pages/SingleQuestion';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Users from './pages/Users';
import AddQuestion from './pages/AddQuestion';
import { UserProvider } from './context/UserContext';
import { QuestionProvider } from './context/QuestionContext';

function App() {
  return (
    <BrowserRouter>

    <UserProvider>
      <QuestionProvider>

        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/:id" element={<SingleQuestion />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addquestion" element={<AddQuestion />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>

      </QuestionProvider>
    </UserProvider>

    </BrowserRouter>
  );
}

export default App;
