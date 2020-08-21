import React from 'react';

const SearchMember = ({setQueryText}) => {

    const searchMember = async (text) => {
        setQueryText(text);
    }

    return (
        <input type="text" placeholder="Search..." onChange={e => searchMember(e.target.value)}/>
    );
}

export default SearchMember;