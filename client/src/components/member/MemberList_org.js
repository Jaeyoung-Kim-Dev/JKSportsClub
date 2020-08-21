import React, {useEffect, useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';
import {findIndex, without} from "lodash"; // 'without': makes to delete elements of array easily. 'findIndex': can find index to update the info.

const ListBooking = ({myBookings, setMyBookings, orderBy, orderDir, queryText}) => {

    let order;
    let filteredBooks = myBookings;
    if (orderDir === 'asc') {
        order = 1;
    } else {
        order = -1;
    }

    filteredBooks = filteredBooks.sort((a, b) => {
        if (a[orderBy].toLowerCase() <
            b[orderBy].toLowerCase()
        ) {
            return -1 * order;
        } else {
            return 1 * order;
        }
    }).filter(eachItem => {
        return (
            eachItem['custName']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['custEmail']
                .toLowerCase()
                .includes(queryText.toLowerCase())
        )
    });

    const updateInfo = async (name, value, id) => {
        let tempBook = myBookings;
        let bookIndex = findIndex(myBookings, {
            bksId: id
        });
        tempBook[bookIndex][name] = value;
        setMyBookings(tempBook);
    }

    const deleteBook = async (bks) => {
        let tempBks = myBookings;
        tempBks = without(tempBks, bks);
        setMyBookings(tempBks);
    }

    return (
        <>
            {filteredBooks.map(book => (
                <div key={book.bksId}>
                    <button onClick={() => deleteBook(book)}><FaTimes/></button>
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('custName', e.target.innerText, book.bksId)
                        }>
                        {book.custName}
                    </div>
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('custEmail', e.target.innerText, book.bksId)
                        }>
                        {book.custEmail}
                    </div>
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('custPhone', e.target.innerText, book.bksId)
                        }>
                        {book.custPhone}
                    </div>
                    <div>From: {book.firstDate}</div>
                    <div>To: {book.lastDate}</div>
                    <div>
                        Created on: <Moment
                        date={book.createDate}
                        parse="YYYY-MM-DD hh:mm"
                        format="MMM-D h:mma"
                    />
                    </div>
                    <br/>
                </div>
            ))}
        </>
    );
}

export default ListBooking;