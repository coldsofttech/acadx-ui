import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import CookieConsent from './components/CookieConsent';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Register from './components/Register';
import RegisterSso from './components/RegisterSso';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <CookieConsentProvider>
            <Router>
                <div className='App'>
                    <Routes>
                        <Route path='/cookie' element={<CookieConsent />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/register-sso' element={<RegisterSso />} />
                    </Routes>
                    <CookieConsent />
                </div>
            </Router>
        </CookieConsentProvider>
    );
}

export default App;
