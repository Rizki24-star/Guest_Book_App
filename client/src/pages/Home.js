import React, { useEffect, useState } from 'react'
import { Datatable, Footer, Header } from '../components'
import axios from 'axios'
import Form from '../components/Form'
import { Button } from 'react-bootstrap'

export default function Home() {
    const [guest, setGuest] = useState({})
    const [show, setShow] = useState(false);

    // FUnction to ger all guest entries from the server
    const getAllGuest = async () => {
        try {
          console.log('Fetching guest data...');
          const res = await axios.get('http://localhost:8800/guest');
          console.log('Response:', res.data);
          setGuest(res.data);
        } catch (error) {
          console.log('Error fetching guest data:', error);
        }
      };

    useEffect(() => {
        getAllGuest()
    }, [])

    // Handle State to set form is show or not
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function to store guest data to server 
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

    // Logout function
    const handleLogout = async () => {
        // Clear the user authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      
        try {
          const res = await axios.post('http://localhost:8800/logout');
          console.log(res);
        } catch (error) {
          console.error('Error logging out:', error);
          // Handle any error that occurred during logout
        }
    }

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
                {/* Datatable component and sending guest entries */}
                <Datatable guest={guest} />
            </div>
            <Footer />
        </div>
    )
}
