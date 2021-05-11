import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddUser({ addRow }) {
    const [startDate, setStartDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());


    function onSubmitHandler(e) {
        e.preventDefault();
        if (lastDate >= startDate) {
            addRow(startDate.toLocaleDateString(), lastDate.toLocaleDateString())
        } else {
            alert('Время регистрации не может быть позже последнего посещения');
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <h3> Date Registration </h3>
            <DatePicker dateFormat='dd.MM.yyyy' selected={startDate} onChange={date => setStartDate(date)} />
            <h3> Date Last Activity </h3>
            <DatePicker dateFormat='dd.MM.yyyy' selected={lastDate} onChange={date => setLastDate(date)} />
            <h3/>
            <button type='submit' >ADD ROW</button>
        </form>)
}

export default AddUser
