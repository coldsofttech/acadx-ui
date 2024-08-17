import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faXTwitter, faMicrosoft, faGithub, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function Login() {
    return (
        <div className='row justify-content-center'>
            <div className='login-container col-md-4'>
                <div className='login-box'>
                    <h3 className='text-center mb-4'>Login</h3>
                    <form>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='email' className='form-label'>Email Address</label>
                            <input type='email' className='form-control' id='email' placeholder='Enter email address' />
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='password' placeholder='Enter password' />
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'right' }}>
                            <Link to='/forgot-password' className='text-secondary'>Forgot password?</Link>
                        </div>
                        <div className='form-group mb-3'>
                            <button type='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>Login</button>
                        </div>
                        <div className='form-group mb-3'>
                            <button type='button' className='btn btn-secondary btn-block' style={{ width: '100%' }}>Register</button>
                        </div>
                        <hr />
                        <div className='form-group mb-3'>
                            <p>or login with</p>
                            <div className='sso-icons'>
                                <a href='https://accounts.google.com' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faGoogle} className='icon' />
                                </a>
                                <a href='https://twitter.com/login' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faXTwitter} className='icon' />
                                </a>
                                <a href='https://login.microsoftonline.com' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faMicrosoft} className='icon' />
                                </a>
                                <a href='https://github.com/login' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faGithub} className='icon' />
                                </a>
                                <a href='https://instagram.com/login' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faInstagram} className='icon' />
                                </a>
                                <a href='https://facebook.com/login' target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faFacebookF} className='icon' />
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
