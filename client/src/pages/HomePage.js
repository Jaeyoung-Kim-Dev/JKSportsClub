import React from 'react';
import {Card, Alert} from 'react-bootstrap';

const HomePage = () => (
    <>
        <Card>
            <Card.Img variant="top" src={require(`../photos/logo.jpg`)}/>
            <Card.Body>
                <Card.Title bg="black">
                    <h1>Welcome to JK Sports Club!</h1>
                </Card.Title>
            </Card.Body>
        </Card>

        <p>This is about a sports club management and it's not a real website.</p>
        <p>This website can do CRUD (Create, Read, Update and Delete). </p>
        <p>Developed by <a href="https://jaeyoungkim.codes/">Jaeyoung Kim</a></p>
        <br/>
        <p>Front end:</p>
        <Alert variant="success">React JS | Bootstrap</Alert>
        <br/>
        <p>Backend:</p>
        <Alert variant="success">Node JS | Express</Alert>
        <br/>
        <p>Database:</p>
        <Alert variant="success">MongoDB</Alert>


    </>
)
export default HomePage;

//logo.jpg from https://pixabay.com/photos/sports-sport-baseball-basketball-5324462/
