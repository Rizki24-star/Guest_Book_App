import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import logo from '../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const location = useLocation();
    const message = location.state?.message || '';
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(user)
    }

    const handleLogin = (token, auth) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(auth));
        navigate('/'); 
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8800/login', user)
            const { token } = res.data;
            const auth = res.data.user;
            handleLogin(token, auth);

        } catch (err) {
            console.log(err)
            // if (err.response.status === 500) {
                setErrorMessage(err.response?.data?.error || err.message)
            // }else{
                // setErrorMessage(err.message)
            // }
        }

    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            <Card className='' style={{ width: '28rem' }}>
                <Card.Body>
                    <Card.Title className='text-center fw-semibold fs-3'>Welcome</Card.Title>
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <img src={logo} alt="aksesmu-logo" style={{ maxWidth: '100px' }} />
                        |
                        <span className='fw-semibold text-success'>Guest Book App</span>
                    </div>
                    {
                        message && (
                            <div className='text-center'>
                                <i className='text-success'>
                                    {message}
                                </i>
                            </div>
                        )
                    }

                    {
                        errorMessage && (
                            <div className='text-danger text-center'>
                                <i>{errorMessage}</i>
                            </div>
                        )
                    }
                    <div className='py-4 text-center'>
                        <form onSubmit={handleSubmit}>
                            <div className='py-2'>
                                <input type="email" className='form-control' name='email' onChange={handleChange} placeholder='Email..' required />
                            </div>
                            <div className='py-2'>
                                <input type="password" className='form-control' name='password' onChange={handleChange} placeholder='Password..' autoComplete="off" required />
                            </div>
                            <div className='py-3'>
                                <button type='submit' className='btn btn-success fw-semibold w-100'>Sign in</button>
                            </div>
                            <span>Dont have an account? <Link className='fw-semibold' to="/register">Register here</Link></span>
                        </form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
