import React, {useState} from 'react';
import {
    Button,
    Modal,
    ListGroup
} from 'react-bootstrap';

const ResetDB = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const commitReset = () => {
        setShow(false);
        fetch(`/api/resetdb`, {
            method: 'post',
        });
        window.location.reload(false); // refresh pages.
    }

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                Restore DB
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Restore DB</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This option is to restore the club data the below.</p>
                    <ListGroup>
                        <ListGroup.Item>Up&Down Votes</ListGroup.Item>
                        <ListGroup.Item>Reviews</ListGroup.Item>
                        <ListGroup.Item>Members</ListGroup.Item>
                    </ListGroup>
                    <br/>
                    <p>If you want to restore the default data then press the 'RESTORE' button.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={commitReset}>
                        RESTORE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ResetDB;