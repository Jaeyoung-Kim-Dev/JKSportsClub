import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import clubInfo from './club-info';
import ClubsListOther from '../components/club/ClubsListOther';
import NotFoundPage from './NotFoundPage';
import VotesSection from '../components/club/VotesSection';
import ReviewsList from '../components/club/ReviewsList';
import AddReviewForm from '../components/club/AddReviewForm'

const ClubPage = ({match}) => {

    const initials = match.params.initials; // from url
    const club = clubInfo.find(club => club.initials === initials); // from clubInfo

    const [clubFeedback, setClubFeedback] = useState({upvotes: 0, reviews: []});

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);  // scroll to top
            const result = await fetch(`/api/clubs/${initials}`);
            const body = await result.json();
            setClubFeedback(body);
        }
        fetchData(); //Cannot use async on useEffect, so made the fetchData and run it later.
    }, [initials]);

    if (!club) return <NotFoundPage/>

    const otherClubs = clubInfo.filter(club => club.initials !== initials);
    /*const clubPhoto = require("../photos/" + initials + ".jpg");*/

    return (
        <>
            <h1>{club.name} Club</h1>
            <br/>
            <Table striped hover>
                <tbody>
                <tr>
                    <th>About</th>
                    <td>{club.about}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>{club.location}</td>
                </tr>
                <tr>
                    <th>Hours</th>
                    <td>{club.hours}</td>
                </tr>
                <tr>
                    <th>Coach</th>
                    <td>{club.coach}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{club.email}</td>
                </tr>
                <tr>
                    <th>Fee</th>
                    <td>{club.fee}</td>
                </tr>
                </tbody>
            </Table>

            <hr/>

            <VotesSection clubInitials={initials} upvotes={clubFeedback.upvotes}
                          setClubFeedback={setClubFeedback}/>

            <hr/>
            <ReviewsList clubInitials={initials} reviews={clubFeedback.reviews}/>
            <hr/>
            <AddReviewForm clubInitials={initials}
                           setClubFeedback={setClubFeedback}/>

            <hr/>

            <h4>Other Clubs</h4>
            <ClubsListOther clubs={otherClubs}/>
        </>
    );
}

export default ClubPage;

//images from
//soccer: https://pixabay.com/photos/the-ball-ball-for-football-football-3644179/
//baseball: https://pixabay.com/photos/baseball-glove-ball-leather-sport-4182179/
//basketball: https://pixabay.com/photos/the-ball-ball-for-basketball-3640769/
//ice hockey:ice: http://www.moosejawminorhockey.com/