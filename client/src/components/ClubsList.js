import React from 'react';
import {Link} from "react-router-dom";
import {Card, Col, Row} from 'react-bootstrap';

const ClubsList = ({clubs}) => (
    <Row>
        {
            clubs.map((club, key) => (
                <Col xs="12" lg="6" key={key}>
                    <Card>
                        <Link to={`/clubs/${club.initials}`}>
                            <Card.Img variant="top" src={require(`../photos/${club.initials}.jpg`)}/>
                            <Card.ImgOverlay>
                            <Card.Body>
                                <Card.Title bg="black"><h2>{club.name}</h2></Card.Title>
                                <Card.Text>
                                    {club.about.substring(0, 100)}...
                                </Card.Text>
                            </Card.Body>
                            </Card.ImgOverlay>
                        </Link>
                    </Card>
                </Col>
            ))
        }
    </Row>
)
export default ClubsList;

/*
clubs.map((club, key) => (
    <Col xs="12" lg="6" key={key}>
        <Card>
            <Link to={`/clubs/${club.initials}`}>
                <Card.Img variant="top" src={require(`../photos/${club.initials}.jpg`)}/>
                <Card.Body>
                    <Card.Title bg="black"><h2>{club.name}</h2></Card.Title>
                    <Card.Text>
                        {club.about.substring(0, 100)}...
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    </Col>
))*/
