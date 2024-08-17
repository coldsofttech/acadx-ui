import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function Register() {
    const [titles, setTitles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submission logic here
    };

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await axios.get(`${config.ACADX_API_URL}/titles`);
                setTitles(response.data);
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };

        fetchTitles();
    }, []);

    return (
        <div className='row justify-content-center'>
            <div className='register-container col-md-10 col-lg-8'>
                <div className='register-box'>
                    <h3 className='text-center mb-4'>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='title' className='form-label'>Title</label>
                                    <select id='title' name='title' className='form-control' value={formData.title} onChange={handleInputChange} required>
                                        <option value=''>Select your title</option>
                                        {titles.map(title => (
                                            <option key={title} value={title}>{title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='firstName' className='form-label'>First Name</label>
                                    <input type='text' className='form-control' id='firstName' name='firstName' value={formData.firstName} onChange={handleInputChange} placeholder='Enter first name' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='middleName' className='form-label'>Middle Name</label>
                                    <input type='text' className='form-control' id='middleName' name='middleName' value={formData.middleName} onChange={handleInputChange} placeholder='Enter middle name' />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='lastName' className='form-label'>Last Name</label>
                                    <input type='text' className='form-control' id='lastName' name='lastName' value={formData.lastName} onChange={handleInputChange} placeholder='Enter last name' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='dob' className='form-label'>Date of birth</label>
                                    <input type='date' className='form-control' id='dob' name='dob' value={formData.dob} onChange={handleInputChange} placeholder='Select date of birth' required />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='email' className='form-label'>Email address</label>
                                    <input type='email' className='form-control' id='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Enter email address' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='confirmEmail' className='form-label'>Confirm email address</label>
                                    <input type='email' className='form-control' id='confirmEmail' name='confirmEmail' value={formData.confirmEmail} onChange={handleInputChange} placeholder='Enter email address' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input type='password' className='form-control' id='password' name='password' value={formData.password} onChange={handleInputChange} placeholder='Enter password' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='confirmPassword' className='form-label'>Confirm password</label>
                                    <input type='password' className='form-control' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} placeholder='Enter password' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'right' }}>
                                    <input type='checkbox' id='termsAccepted' name='termsAccepted' checked={formData.termsAccepted} onChange={handleInputChange} required />
                                    <label htmlFor='termsAccepted' className='form-check-label ms-2 text-secondary'>
                                        I accept the <a href='/terms-and-conditions' className='text-secondary' target='_blank' rel='noopener noreferrer'>Terms and Conditions.</a>
                                    </label>
                                </div>
                                <div className='form-group mb-3'>
                                    <button type='submit' className='btn btn-primary btn-block' style={{ width: '100%' }}>Register</button>
                                </div>
                                <div className='form-group mt-3' style={{ textAlign: 'right' }}>
                                    <Link to='/register-sso' className='text-secondary'>Register with SSO?</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
