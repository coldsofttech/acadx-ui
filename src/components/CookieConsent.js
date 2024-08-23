import React from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function CookieConsent() {
    const { consent, handleConsent } = useCookieConsent();

    if (consent) return null;

    return (
        <div className='cookie-consent'>
            <div className='cookie-consent-content'>
                <h3 className='text-center mb-4 h3-header'>Cookie Consent</h3>
                <p className='text-center mb-4'>
                    We use cookies to enhance your experience. Please choose your cookie preference.
                </p>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='form-group mb-3'>
                            <button type='button' className='btn btn-primary me-2' onClick={() => handleConsent('necessary')}>Accept Necessary Cookies</button>
                            <button type='button' className='btn btn-secondary me-2' onClick={() => handleConsent('all')}>Accept All Cookies</button>
                            <button type='button' className='btn btn-outline-danger' onClick={() => handleConsent('declined')}>Decline All Cookies</button>
                        </div>
                    </div>
                </div>
                <div className='form-group mt-3' style={{ textAlign: 'center' }}>
                    <Link to='/privacy-policy' className='text-link'>Manage Cookie Settings</Link>
                </div>
            </div>
        </div>
    )
}

export default CookieConsent;
