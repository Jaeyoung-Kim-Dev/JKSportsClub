import React, {useEffect, useState} from 'react';
import Registration from '../components/member/Registration';
import MemberList from '../components/member/MemberList';
import SearchMember from '../components/member/SearchMember';

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
            <div className="m-1">
                <span className="p-1">
                    <Registration members={members}
                                  setMembers={setMembers}
                                  lastIndex={lastIndex}
                                  setLastIndex={setLastIndex}/>
                </span>
                <span className="p-1">
                    <SearchMember setQueryText={setQueryText}/>
                </span>
            </div>
            <MemberList members={members}
                        setMembers={setMembers}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        orderDir={orderDir}
                        setOrderDir={setOrderDir}
                        queryText={queryText}/>
        </>
    );
}

export default MembersPage;
