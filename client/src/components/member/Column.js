import React from 'react';

const Column = ({orderBy, setOrderBy, orderDir, setOrderDir}) => {

    const changeOrder = async (order, dir) => {
        setOrderBy(order);
        setOrderDir(dir);
    }

    const searchMember = async (text) => {
        /*setQueryText(text);*/
    }

    const test = () => alert("hi");

    return (
        <tr>
            <th scope="col">Delete</th>
            <th scope="col" onClick={e => changeOrder("name", orderDir)}>Name</th>
            <th scope="col" onClick={e => test}>Club</th>
            <th scope="col">D.O.B</th>
            <th scope="col">City</th>
            <th scope="col" onChange={e => changeOrder("prov", orderDir)}>Prov</th>
            <th scope="col">Phone#</th>
            <th scope="col">E-mail</th>
            <th scope="col">Member Since</th>

            {/*<div className="container">
                <input type="text" placeholder="Search..." onChange={e => searchMember(e.target.value)}/>
                <br/>
                <input type="radio" name="orderby" value="name"
                       onClick={e => changeOrder("name", orderDir)}
                       defaultChecked
                /> <label>Name</label>
                <input type="radio" name="orderby" value="registerClub"
                       onClick={e => changeOrder("registerClub", orderDir)}
                /> <label>Club</label>
                <input type="radio" name="orderby" value="DOB"
                       onClick={() => changeOrder('DOB', orderDir)}
                /> <label>D.O.B</label>
                <input type="radio" name="orderby" value="city"
                       onChange={() => changeOrder('city', orderDir)}
                /><label>City</label>
                <input type="radio" name="orderby" value="prov"
                       onChange={() => changeOrder("prov", orderDir)}
                /><label>Prov</label>
                <input type="radio" name="orderby" value="phone"
                       onChange={() => changeOrder("phone", orderDir)}
                /><label>Phone#</label>
                <input type="radio" name="orderby" value="email"
                       onChange={() => changeOrder("email", orderDir)}
                /><label>E-mail</label>
                <input type="radio" name="orderby" value="registerDate"
                       onChange={() => changeOrder("registerDate", orderDir)}
                /><label>Member Since</label>
                <br/>
                <input type="radio" name="orderdir" value="asc"
                       onChange={() => changeOrder(orderBy, "asc")}
                       defaultChecked
                /><label>Asc</label>
                <input type="radio" name="orderdir" value="desc"
                       onChange={() => changeOrder(orderBy, "desc")}
                /><label>Desc</label>
            </div>*/}

        </tr>



    );
}

export default Column;