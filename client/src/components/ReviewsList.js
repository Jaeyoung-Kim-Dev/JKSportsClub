import React from 'react';
import {
    Toast,
    Row,
    Col
} from 'react-bootstrap';

const ReviewsList = ({reviews}) => (
    <>
        <h4>Reviews</h4>
            <Row>
                {reviews.map((review, key) => (
                    <Col xs={12} sm={6} md={4} className="p-2" key={key}>
                        <Toast>
                            <Toast.Header closeButton={false}>
                                <strong className="mr-auto">{review.username}</strong>
                                <small>10/10/2020</small>
                            </Toast.Header>
                            <Toast.Body>{review.text}</Toast.Body>
                        </Toast>
                    </Col>
                ))}
            </Row>
    </>
)

export default ReviewsList;