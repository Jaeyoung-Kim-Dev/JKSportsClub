import React from 'react';
import {
    Navbar,
    Nav,
    Form,
    Container
} from 'react-bootstrap'
import ResetDB from './components/ResetDB';

const NavBar = () => (
    <Container>
        <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="/">JK Sports Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/club-list">Clubs</Nav.Link>
                    <Nav.Link href="/members">Members</Nav.Link>
                </Nav>
                <Form>
                    <ResetDB/>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    </Container>

);

export default NavBar;