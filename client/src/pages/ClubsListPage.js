import React from 'react';
import ClubsList from '../components/ClubsList';
import clubInfo from './club-info';

const ClubsListPage = () => (
    <>
        <h1 align="center">Clubs</h1>
        <ClubsList clubs={clubInfo}/>
    </>
)

export default ClubsListPage;