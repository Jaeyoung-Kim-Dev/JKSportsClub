import React, {useState, useEffect} from 'react';
import Registration from '../components/Registration';
import MemberList from '../components/MemberList';
import SearchMember from '../components/SearchMember';

const ManagementPage = () => {

    const [myBookings, setMyBookings] = useState([]);
    const [orderBy, setOrderBy] = useState('custName');
    const [orderDir, setOrderDir] = useState('asc');
    const [queryText, setQueryText] = useState('');
    const [lastIndex, setLastIndex] = useState(0);


    useEffect(() => {
        let index = lastIndex
        fetch('./data.json')
            .then(response => response.json())
            .then(result => {
                const bks = result.map(book => {
                    book.bksId = index; // to pass the Keys to 'MemberList.js'
                    index++;
                    return book;
                });
                setLastIndex(index);
                setMyBookings(bks);
            });
    }, []);

    return (
        <>
            <div><Registration
                myBookings={myBookings}
                setMyBookings={setMyBookings}
                lastIndex={lastIndex}
                setLastIndex={setLastIndex}
            /></div>
            <div><SearchMember
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                orderDir={orderDir}
                setOrderDir={setOrderDir}
                setQueryText={setQueryText}
            /></div>
            <div><MemberList
                myBookings={myBookings}
                setMyBookings={setMyBookings}
                orderBy={orderBy}
                orderDir={orderDir}
                queryText={queryText}
            /></div>
        </>
    );
}


export default ManagementPage;
