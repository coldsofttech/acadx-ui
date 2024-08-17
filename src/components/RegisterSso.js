import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faXTwitter, faMicrosoft, faGithub, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function RegisterSso() {
    const [ssoProviders, setSsoProviders] = useState([]);

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
                    <h3 className='text-center mb-4 h3-header'>Register with SSO</h3>
                    <div className='form-group mb-3'>
                        <p>Select a provider:</p>
                        <div className='sso-icons'>
                            {ssoProviders.map((provider) => (
                                <a key={provider.name} href={provider.redirectUrl} target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={provider.icon} className='icon' title={provider.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className='form-group mt-3' style={{ textAlign: 'right' }}>
                        <Link to='/register' className='text-link'>Create a new account?</Link>
                    </div>
                    <div className='form-group mt-3' style={{ textAlign: 'right' }}>
                        <Link to='/login' className='text-link'>Already have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterSso;
