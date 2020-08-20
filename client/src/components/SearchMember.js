import React from 'react';

const SearchMember = ({orderBy, setOrderBy, orderDir, setOrderDir, setQueryText}) => {

    const changeOrder = async (order, dir) => {
        setOrderBy(order);
        setOrderDir(dir);
    }

    const searchMember = async (text) => {
        setQueryText(text);
    }

    return (
        <div className="container">
            <input type="text" placeholder="Search..." onChange={e => searchMember(e.target.value)}/>
            <br/>
            <input type="radio" name="orderby" value="custName"
                   onClick={e => changeOrder("custName", orderDir)}
                   defaultChecked
            /> <label>Customer Name</label>
            <input type="radio" name="orderby" value="custEmail"
                   onClick={e => changeOrder("custEmail", orderDir)}
            /> <label>Customer Email</label>
            <input type="radio" name="orderby" value="custPhone"
                   onClick={() => changeOrder('custPhone', orderDir)}
            /> <label>Customer Phone#</label>
            <input type="radio" name="orderby" value="firstDate"
                   onChange={() => changeOrder('firstDate', orderDir)}
            /><label>First Date</label>
            <input type="radio" name="orderby" value="lastDate"
                   onChange={() => changeOrder("lastDate", orderDir)}
            /><label>Last Date</label>
            <br/>
            <input type="radio" name="orderdir" value="asc"
                   onChange={() => changeOrder(orderBy, "asc")}
                   defaultChecked
            /><label>Asc</label>
            <input type="radio" name="orderdir" value="desc"
                   onChange={() => changeOrder(orderBy, "desc")}
            /><label>Desc</label>
        </div>
    );
}

export default SearchMember;