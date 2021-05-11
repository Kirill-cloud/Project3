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
            <table >
                <thead>
                    <tr>
                        <th><h5> Date Registration </h5></th>
                        <th><h5> Date Last Activity </h5> </th>
                        <th><h3 /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><DatePicker dateFormat='dd.MM.yyyy' selected={startDate} onChange={date => setStartDate(date)} /></td>
                        <td><DatePicker dateFormat='dd.MM.yyyy' selected={lastDate} onChange={date => setLastDate(date)} /></td>
                        <td><button className="elseB" type='submit' >+ ADD ROW</button></td>
                    </tr>
                </tbody>
            </table>
        </form>)
}

export default AddUser
