import React from 'react';
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';
import {findIndex, without} from "lodash"; // 'without': makes to delete elements of array easily. 'findIndex': can find index to update the info.
import {Table} from 'react-bootstrap';

const MemberList = ({members, setMembers, orderBy, setOrderBy, orderDir, setOrderDir, queryText}) => {

    /*const _members = []

    useEffect(() => {
        for (let i = 0; i < 50; i++) {
            _members.push({
                id: faker.random.uuid(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                amountSpent: faker.commerce.price(),
                chargeTo: faker.company.companyName(),
                reason: faker.lorem.sentence(),
            })
        }
    }, []);*/

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

    const deleteMember = async (member) => {
        let tempMembers = members;
        tempMembers = without(tempMembers, member);
        setMembers(tempMembers);
    }

    /*const columns = [
        {accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150,},
        {accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150,},
        {accessor: 'email', label: 'Email', priorityLevel: 6, position: 3, minWidth: 150,},
        {
            accessor: 'amountSpent',
            label: 'Total Spent',
            priorityLevel: 4,
            position: 4,
            minWidth: 150,
        },
        {accessor: 'chargeTo', label: 'Charged To', priorityLevel: 7, position: 5, minWidth: 150,},
        {
            accessor: 'reason',
            label: 'Reason for Purchase',
            priorityLevel: 8,
            position: 7,
            minWidth: 300,
            sortable: false,
        },
    ]*/

    const changeOrder = async (order, dir) => {
        setOrderBy(order);
        setOrderDir(dir);
    }
    /*
        <input type="radio" name="orderdir" value="asc"
               onChange={() => changeOrder(orderBy, "asc")}
               defaultChecked
        /><label>Asc</label>
        <input type="radio" name="orderdir" value="desc"
               onChange={() => changeOrder(orderBy, "desc")}
        /><label>Desc</label>
        */


    return (
        <div style={{overflow: "scroll"}}>
            {/*<ReactCollapsingTable columns={columns}
                                  rows={_members}
                                  rowSize={50}
                                  showSearch={true}
                                  showPagination={true}/>*/}

            <Table>
                <thead className="thead-light">
                <tr>
                    <th scope="col">Delete</th>
                    <th scope="col" onClick={_ => changeOrder("name", orderDir)}>Name</th>
                    <th scope="col" onClick={_ => changeOrder("registerClub", orderDir)}>Club</th>
                    <th scope="col" onClick={_ => changeOrder('DOB', orderDir)}>D.O.B</th>
                    <th scope="col" onClick={_ => changeOrder('city', orderDir)}>City</th>
                    <th scope="col" onClick={_ => changeOrder("prov", orderDir)}>Prov</th>
                    <th scope="col" onClick={_ => changeOrder("phone", orderDir)}>Phone#</th>
                    <th scope="col" onClick={_ => changeOrder("email", orderDir)}>E-mail</th>
                    <th scope="col" onClick={_ => changeOrder("registerDate", orderDir)}>Member Since</th>
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
                            }
                        >
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
            </Table>
        </div>
    );
}

export default MemberList;