import React, { Component } from 'react';
import AddUser from './AddUser'
import Counter from './Counter'
import Modal from './Modal/Modal'

const datesss = [1, 2, 3, 4, 5];

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], histo: [0, 1], retantion: '', loading: true, showHisto: false };
    }

    componentDidMount() {
        this.defaultUsers();
    }

    static renderForecastsTable(forecasts) {

        return (
            <div>

                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Date Registration</th>
                            <th>Date Last Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecast =>
                            <tr key={forecast.id}>
                                <td>{forecast.id}</td>
                                <td>{forecast.date1}</td>
                                <td>{forecast.date2}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        let contents2 = !this.state.showHisto
            ? <p><em>Loading...</em></p>
            : <Counter data={this.state.histo} />;

        return (
            <div>
                <h1 id="tabelLabel" >Users</h1>
                <h1>{this.state.retantion} </h1>
                {contents2}

                <AddUser addRow={addRow.bind(this)} />
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <button type='submit' >Calculate</button>
                </form>
                <button onClick={this.save.bind(this)}  >Save to db</button>

                {contents}
            </div>
        );
    }

    async save() {
        const responce = await fetch('Users',
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.forecasts)
            })
    };

    async onSubmitHandler(e) {
        e.preventDefault();

        const responce = await fetch('Users',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.forecasts)
            })

        const data = await responce.json();
        await setTimeout(() => { this.setState({ histo: data.usersLifeTime, retantion: 'Rolling Retention 7 day:' + data.rR7days, showHisto: true }); }, 30);

    };

    async defaultUsers() {
        const response = await fetch('Users');
        const data = await response.json();
        await setTimeout(() => { this.setState({ forecasts: data, loading: false }); }, 30);
    }
}

function addRow(sd, ld) {
    let a = {
        id: this.state.forecasts.length + 1, date1: sd, date2: ld
    }
    var x = this.state.forecasts.concat(a);

    this.setState({ forecasts: x, loading: false });
}
