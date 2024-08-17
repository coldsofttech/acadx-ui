import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../App.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
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

    return (
        <div className='row justify-content-center'>
            <div className='register-container col-md-10 col-lg-8'>
                <div className='register-box'>
                    <h3 className='text-center mb-4 h3-header'>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='firstName' className='form-label'>First Name</label>
                                    <input type='text' className='form-control' id='firstName' name='firstName' value={formData.firstName} onChange={handleInputChange} placeholder='Enter first name' required />
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
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input type='password' className='form-control' id='password' name='password' value={formData.password} onChange={handleInputChange} placeholder='Enter password' required />
                                </div>
                                <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                    <label htmlFor='confirmPassword' className='form-label'>Confirm password</label>
                                    <input type='password' className='form-control' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} placeholder='Enter password' required />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group mb-3' style={{ textAlign: 'left' }}>
                                <input type='checkbox' id='termsAccepted' name='termsAccepted' checked={formData.termsAccepted} onChange={handleInputChange} required />
                                <label htmlFor='termsAccepted' className='form-check-label ms-2 text-link'>
                                    I consent to the collection and use of my data described in the <a href='/terms-and-conditions' className='text-link' target='_blank' rel='noopener noreferrer'>Terms and Conditions</a>.
                                </label>
                            </div>
                            <div className='form-group mb-3'>
                                <button type='submit' id='submit' className='btn btn-primary btn-block' style={{ width: '50%' }}>Register</button>
                            </div>
                        </div>
                        <hr />
                        <div className='form-group mt-3' style={{ textAlign: 'right' }}>
                            <Link to='/register-sso' className='text-link'>Register with SSO?</Link>
                        </div>
                        <div className='form-group mt-3' style={{ textAlign: 'right' }}>
                            <Link to='/login' className='text-link'>Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
