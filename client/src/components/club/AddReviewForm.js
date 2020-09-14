import React, {useState} from 'react';
import {
    Form,
    Button
} from 'react-bootstrap';
import moment from "moment";

const AddReviewForm = ({clubInitials: clubInitials, setClubFeedback: setClubFeedback}) => {
    const [username, setUsername] = useState('');
    const [registerDate, setRegisterDate] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [valid, setValid] = useState(true);

    const addReview = async (e) => {
        if (username === '') {
            window.alert('Your name Required.');
            setValid(false);
        } else if (reviewText === '') {
            window.alert('Review Required.');
            setValid(false);
        } else {
            setValid(true);
        }

        if (valid) {
            const result = await fetch(`/api/clubs/${clubInitials}/add-review`, {
                method: 'post',
                body: JSON.stringify({username: username, registerDate: moment(), text: reviewText}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const body = await result.json();
            setClubFeedback(body);
            setUsername('');
            setReviewText('');
            e.preventDefault();
        }
    }

    return (
        /*<div className="container jumbotron">
            <h3>Add a Review</h3>
            <label>
                <input type="text" value={username} className="form-control" placeholder="Name"
                       onChange={(event) => setUsername(event.target.value)}/>
            </label>
            <br/>
            <label>
                <textarea rows="4" cols="50" value={reviewText} className="form-control" placeholder="Review"
                          onChange={(event) => setReviewText(event.target.value)}/>
            </label>
            <br/>
            <button className="btn btn-success" onClick={() => addReview()}>Add Comment</button>
        </div>*/

        <Form>
            <Form.Label>Add Your Review Here</Form.Label>
            <Form.Group>
                <Form.Control
                    id="name"
                    type="text"
                    placeholder="Your name"
                    onChange={(event) => setUsername(event.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    id="review"
                    as="textarea"
                    rows="3"
                    placeholder="What do you think about this club?"
                    onChange={(event) => setReviewText(event.target.value)}
                />
            </Form.Group>
            <Button
                type="submit"
                className="mb-2"
                onClick={e =>addReview(e)}
            >
                Add Review
            </Button>
        </Form>
    );
}

export default AddReviewForm;