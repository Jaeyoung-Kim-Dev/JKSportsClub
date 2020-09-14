import React from 'react';
import {
    FiThumbsUp,
    FiThumbsDown
} from 'react-icons/fi';
import {
    Container,
    Button,
} from 'react-bootstrap';

const VotesSection = ({clubInitials, upvotes, setClubFeedback}) => {
    const upvoteClub = async () => {
        const result = await fetch(`/api/clubs/${clubInitials}/upvote`, {
            method: 'post',
        });
        const body = await result.json();
        setClubFeedback(body);
    }

    const downvoteClub = async () => {
        const result = await fetch(`/api/clubs/${clubInitials}/downvote`, {
            method: 'post',
        });
        const body = await result.json();
        setClubFeedback(body);
    }
    return (
        <>
            <Button variant="success m-1" onClick={() => upvoteClub()}><FiThumbsUp/></Button>
            <Button variant="danger m-1" onClick={() => downvoteClub()}><FiThumbsDown/></Button>
            <p className="d-inline-block p-2">This club has been upvoted <span className="font-weight-bold">{upvotes}</span> times.</p>
        </>
    );
}

export default VotesSection;