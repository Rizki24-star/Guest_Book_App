import React from 'react'
import { Container, NavDropdown, Navbar } from 'react-bootstrap'

function Header({logout}) {
  const auth = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className='fw-bold text-success'>Guest Book App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={auth?.name || '' } id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
            <form onSubmit={logout}>
              <button className='btn btn-sm text-danger fw-semibold'>Sign Out</button>
            </form>
            </NavDropdown.Item> 
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
