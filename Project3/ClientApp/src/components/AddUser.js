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
            <DatePicker dateFormat='dd.MM.yyyy' selected={startDate} onChange={date => setStartDate(date)} />
            <DatePicker dateFormat='dd.MM.yyyy' selected={lastDate} onChange={date => setLastDate(date)} />

            <button type='submit' >Add Row</button>
        </form>)
}

export default AddUser
