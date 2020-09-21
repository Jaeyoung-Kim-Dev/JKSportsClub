import React, {useEffect, useState} from 'react';
import Registration from '../components/member/Registration';
import MemberList from '../components/member/MemberList';
import SearchMember from '../components/member/SearchMember';
import {Button, Modal} from "react-bootstrap";

const MembersPage = () => {

    const [members, setMembers] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [orderDir, setOrderDir] = useState('asc');
    const [queryText, setQueryText] = useState('');
    const [lastIndex, setLastIndex] = useState(0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let index = lastIndex
        fetch('./clubMembers.json')
            .then(response => response.json())
            .then(result => {
                const members = result.map(member => {
                    member.membersId = index; // to pass the Keys to 'MemberList.js'
                    index++;
                    return member;
                });
                setLastIndex(index);
                setMembers(members);
            });
    }, []);

    return (
        <>
            <h1 align="center">Members</h1>
            <div className="m-1">
                <span className="p-1">
                    <Button variant="success" onClick={handleShow}>
                        Detail
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Members Page</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>It shows the members of the club.</p>
                            <p>All members' data is read from JSON.</p>
                            <p>You can add, search, sort, update, and delete members.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </span>
                <span className="p-1">
                    <Registration members={members}
                                  setMembers={setMembers}
                                  lastIndex={lastIndex}
                                  setLastIndex={setLastIndex}/>
                </span>
                <span className="p-1">
                    <SearchMember setQueryText={setQueryText}/>
                </span>
            </div>
            <MemberList members={members}
                        setMembers={setMembers}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        orderDir={orderDir}
                        setOrderDir={setOrderDir}
                        queryText={queryText}/>
        </>
    );
}

export default MembersPage;
