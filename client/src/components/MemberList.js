import React from 'react';
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';
import {findIndex, without} from "lodash"; // 'without': makes to delete elements of array easily. 'findIndex': can find index to update the info.

const MemberList = ({members, setMembers, orderBy, orderDir, queryText}) => {

    let order;
    let filteredMembers = members;
    if (orderDir === 'asc') {
        order = 1;
    } else {
        order = -1;
    }

    filteredMembers = filteredMembers.sort((a, b) => {
        if (a[orderBy].toLowerCase() <
            b[orderBy].toLowerCase()
        ) {
            return -1 * order;
        } else {
            return 1 * order;
        }
    }).filter(eachItem => {
        return (
            eachItem['name']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['registerClub']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['DOB']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['city']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['prov']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['phone']
                .toLowerCase()
                .includes(queryText.toLowerCase()) ||
            eachItem['email']
                .toLowerCase()
                .includes(queryText.toLowerCase())
        )
    });

    const updateInfo = async (name, value, id) => {
        let tempMember = members;
        let memberIndex = findIndex(members, {
            membersId: id
        });
        tempMember[memberIndex][name] = value;
        setMembers(tempMember);
    }

    const deleteMember = async (bks) => {
        let tempMember = members;
        tempMember = without(tempMember, bks);
        setMembers(tempMember);
    }

    return (
        <table className="container table">
            <thead className="thead-light">
            <tr>
                <th scope="col">Delete</th>
                <th scope="col">Name</th>
                <th scope="col">Club</th>
                <th scope="col">D.O.B</th>
                <th scope="col">City</th>
                <th scope="col">Prov</th>
                <th scope="col">Phone#</th>
                <th scope="col">E-mail</th>
                <th scope="col">Member Since</th>
            </tr>
            </thead>
            <tbody>
            {filteredMembers.map(member => (
                <tr key={member.membersId}>
                    <th scope="row">
                        <button onClick={() => deleteMember(member)}><FaTimes/></button>
                    </th>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('name', e.target.innerText, member.membersId)
                        }>
                        {member.name}
                    </td>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('registerClub', e.target.innerText, member.membersId)
                        }>
                        {member.registerClub}
                    </td>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('DOB', e.target.innerText, member.membersId)
                        }>
                        {member.DOB}
                    </td>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('city', e.target.innerText, member.membersId)
                        }>
                        {member.city}
                    </td>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('prov', e.target.innerText, member.membersId)
                        }>
                        {member.prov}
                    </td>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('phone', e.target.innerText, member.membersId)
                        }>
                        {member.phone}
                    </td>
                    <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={
                            e => updateInfo('email', e.target.innerText, member.membersId)
                        }>
                        {member.email}
                    </td>
                    <td>
                        <Moment
                        date={member.registerDate}
                        parse="YYYY-MM-DD hh:mm"
                        format="MMM-D h:mma"
                    />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MemberList;