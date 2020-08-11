import React, {useState, useEffect} from 'react';
import Registration from '../components/Registration';
import MemberList from '../components/MemberList';
import SearchMember from '../components/SearchMember';

const MembersPage = () => {

    const [members, setMembers] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [orderDir, setOrderDir] = useState('asc');
    const [queryText, setQueryText] = useState('');
    const [lastIndex, setLastIndex] = useState(0);


    useEffect(() => {
        let index = lastIndex
        fetch('./data.json')
            .then(response => response.json())
            .then(result => {
                const members = result.map(member => {
                    member.membersId = index; // to pass the Keys to 'MemberList.js'
                    index++;
                    return member;
                });
                setLastIndex(index);
                setMembers(members);
            });
    }, []);

    return (
        <>
            <h1 align="center">Clubs</h1>
            <div><Registration
                members={members}
                setMembers={setMembers}
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
                members={members}
                setMembers={setMembers}
                orderBy={orderBy}
                orderDir={orderDir}
                queryText={queryText}
            /></div>
        </>
    );
}

export default MembersPage;
