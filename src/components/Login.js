import React, { useEffect, useState } from 'react';
import config from '../config';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function Login() {
    const navigate = useNavigate();
    const [ssoProviders, setSsoProviders] = useState([]);
    const [iconMapping, setIconMapping] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegister = (isSso) => {
        if (isSso) {
            navigate('/register-sso');
        } else {
            navigate('/register');
        }
    };

    useEffect(() => {
        const fetchSsoIntegrations = async () => {
            try {
                const params = new URLSearchParams({
                    page: 1,
                    pageSize: 6
                });
                const url = `${config.ACADX_API_URL}/ssointegrations?${params.toString()}`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.error('Failed to fetch SSO integrations.')
                }

                const result = await response.json();
                setSsoProviders(result.ssoIntegrations || []);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchSsoIcons = async () => {
            try {
                const url = `${config.ACADX_API_URL}/ssoicons`;
                const response = await fetch(url);

                if (!response.ok) {
                    console.error('Failed to fetch SSO integration icons.');
                }

                const icons = await response.json();
                const iconMap = icons.reduce((map, iconName) => {
                    const iconComponent = Icons[iconName];
                    if (iconComponent) {
                        map[iconName] = iconComponent;
                    }
                    return map;
                }, {});

                setIconMapping(iconMap);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchSsoIntegrations();
        fetchSsoIcons();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email: formData.email,
                password: formData.password
            };
            const url = `${config.ACADX_API_URL}/users/login`;
            const response = await fetch(url, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to login.');
                return;
            }

            const result = await response.json();
            Cookies.set('user_id', result.id, { expires: 1 });
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className='row justify-content-center'>
            <div className='login-container col-md-4'>
                <div className='login-box'>
                    <h3 className='text-center mb-4 h3-header'>Login</h3>
                    {errorMessage && (
                        <div className='alert alert-danger' role='alert'>
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='email' className='form-label'>Email Address</label>
                            <input type='email' className='form-control' id='email' name='email' autoComplete='email' value={formData.email} onChange={handleInputChange} placeholder='Enter email address' required />
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='password' name='password' autoComplete='current-password' value={formData.password} onChange={handleInputChange} placeholder='Enter password' required />
                        </div>
                        <div className='form-group mb-3' style={{ textAlign: 'right' }}>
                            <Link to='/forgot-password' className='text-link'>Forgot password?</Link>
                        </div>
                        <div className='form-group mb-3'>
                            <button type='submit' id='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>Login</button>
                        </div>
                        <div className='form-group mb-3'>
                            <button type='button' className='btn btn-secondary btn-block' style={{ width: '100%' }} onClick={() => handleRegister(false)}>Register</button>
                        </div>
                        {ssoProviders.length > 0 && (
                            <>
                                <hr />
                                <div className='form-group mb-3'>
                                    <p>or login with</p>
                                    <div className='sso-icons'>
                                        {ssoProviders.map((integration) => (
                                            <a key={integration.id} href={integration.redirect_url} rel='noopener noreferrer'>
                                                <FontAwesomeIcon icon={iconMapping[integration.icon]} className='icon' title={integration.placeholder_text} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
