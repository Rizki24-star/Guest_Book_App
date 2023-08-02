import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import logo from '../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


export default function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(user)
    }

    // function to send user data to server
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8800/register', user)
            console.log(res);
            if (res.data.status) {
                console.log({status: res.data.status})
                navigate('/login', { state: { message: res.data.message } });
            }

        } catch (err) {
            console.log(err)
            setErrorMessage(err.response?.data?.message)
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
                        errorMessage && (
                            <div className='text-center'>
                                <i className='text-danger'>{errorMessage}</i>
                            </div>
                        )
                    }
                    <div className='py-4 text-center'>
                        <form onSubmit={handleSubmit}>
                            <div className='py-2'>
                                <input type="text" name='name' onChange={handleChange} className='form-control' placeholder='Name..' required />
                            </div>
                            <div className='py-2'>
                                <input type="email" name='email' onChange={handleChange} className='form-control' placeholder='Email..' required />
                            </div>
                            <div className='py-2'>
                                <input type="password" name='password' onChange={handleChange} className='form-control' placeholder='Password..' required />
                            </div>
                            <div className='py-3'>
                                <button type='submit' className='btn btn-success fw-semibold w-100'>Sign Up</button>
                            </div>
                            <span>Already have an account? <Link className='fw-semibold' to="/login">Login here</Link></span>
                        </form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
