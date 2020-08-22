import React, {useState} from 'react';
import {FaPlus} from 'react-icons/fa';
import {Button, Form, Modal} from "react-bootstrap";

const Registration = ({members, setMembers, lastIndex, setLastIndex}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialInfo = {
        name: '',
        registerClub: '',
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
        member.bksId = lastIndex;
        tempMembers.unshift(member);
        setMembers(tempMembers);
        setLastIndex(lastIndex + 1);
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        let newDate = new Date();
        let date = ("0" + (newDate.getDate() + 1)).slice(-2)
        let month = ("0" + (newDate.getMonth() + 1)).slice(-2)
        let year = newDate.getFullYear();
        let hour = ("0" + (newDate.getHours() + 1)).slice(-2)
        let minute = ("0" + (newDate.getMinutes() + 1)).slice(-2)
        let now = year + "-" + month + "-" + date + " " + hour + ":" + minute;

        tempMember.createDate = now;

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
                            <Form.Control as="select">
                                <option>Baseball</option>
                                <option>Soccer</option>
                                <option>Basketball</option>
                                <option>Ice Hockey</option>
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