import React from 'react';
import {Container} from 'react-bootstrap';
import ClubsList from '../components/ClubsList';
import clubInfo from './club-info';

const ClubsListPage = () => (
    <>
        <h1 align="center">Clubs</h1>
        <Container>
            <ClubsList clubs={clubInfo}/>
        </Container>
    </>
)

export default ClubsListPage;