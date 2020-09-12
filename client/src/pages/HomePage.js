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
        <p>This website can do CRUD (Create, Read, Update, Delete). </p>

        <Alert variant="primary">Clubs Page</Alert>
        <p>Clubs Page: There are a list of clubs people can join. It includes a basic information. People can do up/down
            votes and write a reviews. All data is stored in a database permanently and you can restore as default with
            clicking the Reset DB button at the top right.</p>
        <p>Members Page: It shows the members of the club. All members data is read from JSON. You can add, search,
            sort, update and delete members.</p>

        <p>Front end: React JS | Bootstrap</p>
        <p>Backend: Node JS | Express</p>
        <p>Database: MongoDB</p>

        <p>Developed by Jaeyoung Kim</p> 
    </>
)
export default HomePage;

//logo.jpg from https://pixabay.com/photos/sports-sport-baseball-basketball-5324462/
