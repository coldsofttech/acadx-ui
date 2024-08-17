import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import RegisterSso from './components/RegisterSso';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/register-sso' element={<RegisterSso />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
