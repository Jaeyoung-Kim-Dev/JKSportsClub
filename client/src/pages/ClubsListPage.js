import React, {useState} from 'react';
import ClubsList from '../components/club/ClubsList';
import clubInfo from './club-info';
import {Button, Modal} from "react-bootstrap";

const ClubsListPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <h1 align="center">Clubs</h1>

            <Button variant="success" onClick={handleShow}>
                Detail
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Clubs Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>There are a list of clubs people can join.</p>
                    <p> It includes a basic information. People can do up/down
                        votes and write a reviews.</p>
                    <p> All data is stored in a database permanently and you can restore
                        as default with clicking the Reset DB button at the top right.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <ClubsList clubs={clubInfo}/>
        </>
    )
}

export default ClubsListPage;