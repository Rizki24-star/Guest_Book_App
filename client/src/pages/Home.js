import React, { useEffect, useState } from 'react'
import { Datatable, Footer, Header } from '../components'
import axios from 'axios'
import Form from '../components/Form'
import { Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

export default function Home() {
    const [guest, setGuest] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllGuest = async () => {
        try {
            const res = await axios.get('http://localhost:8800/guest')
            console.log(res);
            setGuest(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (guestData) => {
        try {
            const res = await axios.post("http://localhost:8800/guest", guestData)
            console.log(res)
        } catch (error) {
            console.log(error);
        }

        getAllGuest()
        handleClose();
    }

    const handleLogout = async () => {
        // Clear the user authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        const res = await axios.post('http://localhost:8800/logout')
        console.log(res);
        // Redirect the user to the login page after logout
        return <Navigate to="/login" replace state={{ message: 'You have been logged out.' }} />;
    };

    useEffect(() => {
        getAllGuest()
    }, [])

    return (
        <div>
            <Header logout={handleLogout} />
            <div className="content container py-3" style={{ minHeight: '100vh' }}>
                <div className='py-2 d-flex'>
                    <h3>Guest Entries</h3>
                    <div className='ms-auto'>
                        <Button variant="success fw-semibold" onClick={handleShow}>
                            + Create Guest
                        </Button>
                        <Form show={show} onHide={handleClose} onSubmit={handleSubmit} />
                    </div>
                </div>
                <hr />
                <Datatable guest={guest} />
            </div>
            <Footer />
        </div>
    )
}
