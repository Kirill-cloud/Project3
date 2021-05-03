    import React, { Component } from 'react';
    import AddUser from './AddUser'

export class FetchData extends Component {
        static displayName = FetchData.name;

        constructor(props) {
            super(props);
            this.state = { forecasts: [], loading: true };
        }

        componentDidMount() {
            this.populateWeatherData();
        }

        static renderForecastsTable(forecasts) {

            return (
                <div>

                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date1</th>
                                <th>Date2</th>
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

        return (
            <div>
                <h1 id="tabelLabel" >Users</h1>

                <AddUser addRow={addRow.bind(this)} />
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <button type='submit' >Send</button>
                </form>
                {contents}
            </div>
        );
    }



    async onSubmitHandler(e){
        e.preventDefault();
        
        const responce = await fetch('WeatherForecast',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.forecasts)
            })
        const data = await responce.json();
        
    };

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
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
