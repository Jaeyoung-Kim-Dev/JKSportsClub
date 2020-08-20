import React from 'react';
import {Form, Nav, Navbar} from 'react-bootstrap'
import ResetDB from './components/ResetDB';

const NavBar = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Nav className="mr-auto">
                <Nav.Link href="/club-list">Clubs</Nav.Link>
                <Nav.Link href="/members">Members</Nav.Link>
            </Nav>
            <Form>
                <ResetDB/>
            </Form>
    </Navbar>
);

export default NavBar;