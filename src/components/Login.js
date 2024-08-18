import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faXTwitter, faMicrosoft, faGithub, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function Login() {
    const navigate = useNavigate();
    const [ssoProviders, setSsoProviders] = useState([]);

    const handleRegister = (isSso) => {
        if (isSso) {
            navigate('/register-sso');
        } else {
            navigate('/register');
        }
    };

    useEffect(() => {
        axios.get(`${config.ACADX_API_URL}/sso-integrations`)
            .then(response => {
                const ssoData = response.data;

                const iconMapping = {
                    'faGoogle': faGoogle,
                    'faXTwitter': faXTwitter,
                    'faMicrosoft': faMicrosoft,
                    'faGithub': faGithub,
                    'faInstagram': faInstagram,
                    'faFacebookF': faFacebookF
                };

                const mappedProviders = ssoData.map(provider => ({
                    ...provider,
                    icon: iconMapping[provider.icon] || faGoogle
                }));

                setSsoProviders(mappedProviders);
            })
            .catch(err => {
                console.error('Error loading SSO configuration:', err)
            });
    }, []);

    return (
        <div className='row justify-content-center'>
            <div className='login-container col-md-4'>
                <div className='login-box'>
                    <h3 className='text-center mb-4 h3-header'>Login</h3>
                    <form>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='email' className='form-label'>Email Address</label>
                            <input type='email' className='form-control' id='email' name='email' autoComplete='email' placeholder='Enter email address' required />
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='password' name='password' autoComplete='current-password' placeholder='Enter password' required />
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'right' }}>
                            <Link to='/forgot-password' className='text-link'>Forgot password?</Link>
                        </div>
                        <div className='form-group mb-3'>
                            <button type='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>Login</button>
                        </div>
                        <div className='form-group mb-3'>
                            <button type='button' className='btn btn-secondary btn-block' style={{ width: '100%' }} onClick={() => handleRegister(false)}>Register</button>
                        </div>
                        <hr />
                        <div className='form-group mb-3'>
                            <p>or login with</p>
                            <div className='sso-icons'>
                                {ssoProviders.map((provider) => (
                                    <a key={provider.name} href={provider.redirectUrl} rel='noopener noreferrer'>
                                        <FontAwesomeIcon icon={provider.icon} className='icon' title={provider.name} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
