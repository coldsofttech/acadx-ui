import React, { createContext, useContext, useState, useEffect } from 'react';
import config from '../config';

const CookieConsentContext = createContext();

export const useCookieConsent = () => useContext(CookieConsentContext);
export const CookieConsentProvider = ({ children }) => {
    const [consent, setConsent] = useState(null);

    useEffect(() => {
        fetch(`${config.ACADX_API_URL}/cookie`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setConsent(data.cookieConsent))
            .catch(error => console.error('Error fetching cookie consent:', error));
    }, []);

    const handleConsent = (type) => {
        fetch(`${config.ACADX_API_URL}/cookie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ preference: type }),
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    setConsent(type);
                }
            })
            .catch(error => console.error('Error setting cookie:', error));
    };

    return (
        <CookieConsentContext.Provider value={{ consent, handleConsent }}>
            {children}
        </CookieConsentContext.Provider>
    );
};
