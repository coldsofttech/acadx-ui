import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function ForgotPassword() {
    return (
        <div className='row justify-content-center'>
            <div className='forgot-password-container col-md-4'>
                <div className='forgot-password-box'>
                    <h3 className='text-center mb-4'>Forgot Password</h3>
                    <form>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='email' className='form-label'>Email address</label>
                            <input type='email' className='form-control' id='email' placeholder='Enter email address' />
                        </div>
                        <div className='form-group mb-3'>
                            <button type='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>Send Reset Link</button>
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'right' }}>
                            <Link to='/login' className='text-secondary'>Remember your password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
