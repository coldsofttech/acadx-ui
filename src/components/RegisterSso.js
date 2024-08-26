import React, { useEffect, useState } from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function RegisterSso() {
    const [ssoProviders, setSsoProviders] = useState([]);
    const [iconMapping, setIconMapping] = useState({});

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

    return (
        <div className='row justify-content-center'>
            <div className='login-container col-md-4'>
                <div className='login-box'>
                    <h3 className='text-center mb-4 h3-header'>Register with SSO</h3>
                    <div className='form-group mb-3'>
                        <p>Select a provider:</p>
                        {ssoProviders.length > 0 && (
                            <>
                                <div className='sso-icons'>
                                    {ssoProviders.map((integration) => (
                                        <a key={integration.id} href={integration.redirect_url} rel='noopener noreferrer'>
                                            <FontAwesomeIcon icon={iconMapping[integration.icon]} className='icon' title={integration.placeholder_text} />
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
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
