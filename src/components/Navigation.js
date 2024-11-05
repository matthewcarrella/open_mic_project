import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
	return (
		 <Navbar bg="light" data-bs-theme="light"> 
        <Container>

          <Nav className="me-auto">
            <Nav.Link href="/">Artist</Nav.Link>
            <Nav.Link href="organizer">Organizer</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>);
}


export default Navigation;