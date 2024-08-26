import React, { createContext, useContext, useState, useEffect } from 'react';
import config from '../config';

const CookieConsentContext = createContext();

export const useCookieConsent = () => useContext(CookieConsentContext);
export const CookieConsentProvider = ({ children }) => {
    const [consent, setConsent] = useState(null);

    useEffect(() => {
        const fetchCookie = async () => {
            try {
                const url = `${config.ACADX_API_URL}/cookie`;
                const response = await fetch(url, { credentials: 'include' });

                if (!response.ok) {
                    console.error('Failed to fetch cookie.');
                }

                const result = await response.json();
                setConsent(result.value);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchCookie();
    }, []);

    const handleConsent = async (type) => {
        try {
            const params = new URLSearchParams({
                preference: type
            });
            const url = `${config.ACADX_API_URL}/cookie?${params.toString()}`;
            const response = await fetch(url, { method: 'POST', credentials: 'include' });

            if (!response.ok) {
                console.error('Failed to set cookie.');
            }

            const result = await response.json();
            setConsent(result.value);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <CookieConsentContext.Provider value={{ consent, handleConsent }}>
            {children}
        </CookieConsentContext.Provider>
    );
};
