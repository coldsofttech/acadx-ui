import React, { useEffect, useState } from 'react';
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
        fetch('/sso-config.json')
        .then(response => response.json())
        .then(data => {
            const iconMapping = {
            faGoogle,
            faXTwitter,
            faMicrosoft,
            faGithub,
            faInstagram,
            faFacebookF
            };

            const mappedProviders = data.map(provider => ({
            ...provider,
            icon: iconMapping[provider.icon] || faGoogle
            }));

            setSsoProviders(mappedProviders);
        })
        .catch(error => console.error('Error loading SSO configurations:', error));
    }, []);

    return (
        <div className='row justify-content-center'>
            <div className='login-container col-md-4'>
                <div className='login-box'>
                    <h3 className='text-center mb-4'>Register with SSO</h3>
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
                    <div className='form-group mt-3' style={{ textAlign: 'right' }}>
                        <Link to='/register' className='text-secondary'>Register normally?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterSso;
