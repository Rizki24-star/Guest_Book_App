import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'

export default function Form({ show, onHide, onSubmit }) {

    const [guestData, setGuestData] = useState({
        name: "",
        email: "",
        date_pf_birth: "",
        id_card_number: null
    });

    const handleChange = (e) => {
        setGuestData((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(guestData); 
      }

    return (
        <>
            <Offcanvas show={ show ? true : false }  onHide={onHide}  placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Create Guest</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <div className='py-2'>
                            <label htmlFor="">Name</label>
                            <input type="text" onChange={handleChange} name='name' className='form-control border-dark' required/>
                        </div>
                        <div className='py-2'>
                            <label htmlFor="">Email</label>
                            <input type="email" onChange={handleChange} name='email' className='form-control border-dark' required/>
                        </div>
                        <div className='py-2'>
                            <label htmlFor="">Date of Birth</label>
                            <input type="date" onChange={handleChange} name='date_of_birth' className='form-control border-dark' required/>
                        </div>
                        <div className='py-2'>
                            <label htmlFor="">ID Card Number</label>
                            <input type="number" onChange={handleChange} name='id_card_number' className='form-control border-dark' required/>
                        </div>
                        <div className='mt-5'>
                            <button type='submit bottom-0' className='btn btn-primary w-100'>Submit</button>
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
