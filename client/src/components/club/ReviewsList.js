import React from 'react';
import {Col, Row, Toast} from 'react-bootstrap';
import Moment from "react-moment";

const ReviewsList = ({reviews}) => (
    <>
        <h4>Reviews</h4>
        <Row>
            {reviews.map((review, key) => (
                <Col xs={12} sm={6} md={4} className="p-2" key={key}>
                    <Toast>
                        <Toast.Header closeButton={false}>
                            <strong className="mr-auto">{review.username}</strong>
                            <small>
                                <Moment date={review.registerDate}
                                        format="YYYY-MM-DD"/>
                            </small>
                        </Toast.Header>
                        <Toast.Body>{review.text}</Toast.Body>
                    </Toast>
                </Col>
            ))}
        </Row>
    </>
)

export default ReviewsList;