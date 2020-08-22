import React, {useState} from 'react';
import {FaPlus} from 'react-icons/fa';

const Registration = ({members, setMembers, lastIndex, setLastIndex}) => {

    const initialBooking = {
        custName: '',
        custEmail: '',
        custPhone: '',
        numberAdults: '',
        numberChild: '',
        createDate: '',
        firstDate: '',
        lastDate: ''
    }

    const [tempMember, setTempMember] = useState(initialBooking);
    const [formDisplay, setFormDisplay] = useState(false); // to toggle the 'Registration' form.

    const toggleForm = async () => {  // to change the state of 'formDisplay' in the 'Registration' form.
        setFormDisplay(!formDisplay);
    }

    const registerMember = async (member) => {
        let tempMembers = members;
        member.bksId = lastIndex;
        tempMembers.unshift(member);
        setMembers(tempMembers);
        setLastIndex(lastIndex + 1);
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        let newDate = new Date();
        let date = ("0" + (newDate.getDate() + 1)).slice(-2)
        let month = ("0" + (newDate.getMonth() + 1)).slice(-2)
        let year = newDate.getFullYear();
        let hour = ("0" + (newDate.getHours() + 1)).slice(-2)
        let minute = ("0" + (newDate.getMinutes() + 1)).slice(-2)
        let now = year + "-" + month + "-" + date + " " + hour + ":" + minute;

        tempMember.createDate = now;

        registerMember(tempMember);

        setTempMember(initialBooking);

        toggleForm();
    }

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setTempMember(prevState => ({
            ...prevState,   // keep the previous values
            [name]: value,
        }));
    }

    return (
        <>
            <div
                onClick={toggleForm}>
                <FaPlus/>Register new Member
            </div>
            <form
                className={(formDisplay ? '' : 'create-booking')}
                onSubmit={handleAdd}>
                <label htmlFor="custName">Name:</label>
                <input
                    type="text"
                    name="custName"
                    value={tempMember.custName}
                    onChange={handleChange}>
                </input><br/>
                <label htmlFor="custEmail">Email:</label>
                <input
                    type="text"
                    name="custEmail"
                    value={tempMember.custEmail}
                    onChange={handleChange}>
                </input><br/>
                <label htmlFor="custPhone#"> Phone#:</label>
                <input
                    type="text"
                    name="custPhone"
                    value={tempMember.custPhone}
                    onChange={handleChange}>
                </input><br/>
                <label htmlFor="numberAdults">Adults?:</label>
                <input
                    type="number"
                    name="numberAdults"
                    value={tempMember.numberAdults}
                    onChange={handleChange}>
                </input><br/>
                <label htmlFor="numberChild">Child?: </label>
                <input
                    type="number"
                    name="numberChild"
                    value={tempMember.numberChild}
                    onChange={handleChange}>
                </input><br/>
                <label htmlFor="firstDate">From:</label>
                <input
                    type="date"
                    name="firstDate"
                    value={tempMember.firstDate}
                    onChange={handleChange}>
                </input><br/>
                <label htmlFor="lastDate">To:</label>
                <input
                    type="date"
                    name="lastDate"
                    value={tempMember.lastDate}
                    onChange={handleChange}>
                </input><br/>
                <button type="submit">Submit</button>
            </form>
        </>
    );

}

export default Registration;