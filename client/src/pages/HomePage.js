import React from 'react';
import { Card, Alert } from 'react-bootstrap';

const HomePage = () => (
  <>
    <Card>
      <Card.Img variant='top' src={require(`../photos/logo.jpg`)} />
      <Card.Body>
        <Card.Title bg='black'>
          <h1>Welcome to JK Sports Club!</h1>
        </Card.Title>
      </Card.Body>
    </Card>
    <Alert variant='success'>
      This is a web application that provides information about sports clubs,
      manages reviews, and adds, modifies and deletes membership information.
    </Alert>
  </>
);
export default HomePage;

//logo.jpg from https://pixabay.com/photos/sports-sport-baseball-basketball-5324462/
