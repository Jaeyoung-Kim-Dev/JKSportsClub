import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import moment from "moment";

const Registration = ({members, setMembers, lastIndex, setLastIndex}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialInfo = {
        name: '',
        registerClub: 'N/A',
        DOB: '',
        city: '',
        prov: '',
        phone: '',
        email: '',
        registerDate: ''
    }

    const [tempMember, setTempMember] = useState(initialInfo);

    const registerMember = async (member) => {
        let tempMembers = members;
        member.membersId = lastIndex;
        tempMembers.unshift(member);
        setMembers(tempMembers);
        setLastIndex(lastIndex + 1);
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        tempMember.registerDate = moment();

        await registerMember(tempMember);

        setTempMember(initialInfo);

        handleClose();
    }

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setTempMember(prevState => ({
            ...prevState,   // keep the previous values
            [name]: value,
        }));
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={tempMember.name}
                                placeholder="John Doe"
                                onChange={handleChange}
                                />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Club</Form.Label>
                            <Form.Control as="select"
                                          name="registerClub"
                                          value={tempMember.registerClub}
                                          onChange={handleChange}
                            >
                                <option>N/A</option>
                                <option>BASEBALL</option>
                                <option>SOCCER</option>
                                <option>BASKETBALL</option>
                                <option>ICE HOCKEY</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="DOB"
                                value={tempMember.DOB}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={tempMember.city}
                                placeholder="Calgary"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Province</Form.Label>
                            <Form.Control
                                type="text"
                                name="prov"
                                value={tempMember.prov}
                                placeholder="AB"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="phone"
                                name="phone"
                                value={tempMember.phone}
                                placeholder="999-999-9999"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={tempMember.email}
                                placeholder="name@example.com"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Registration;