import React, { Component } from 'react';
import SomeComp from './SomeComp.js';
import Histogram from 'react-native-histogram';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

            <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
            <HistogramExample />
      </div>
    );
  }
}

var HistogramExample = React.createClass({
    getInitialState: function () {
        return { data: [{}] }
    },
    componentWillMount: function () {
        var row_datas = [];
        for (var i = 0; i < 500; i++) {
            row_datas[i] = Math.random() * 100;
        }
        this.setState({
            data: [{ data: row_datas }]
        })
    },
    render: function () {
        return (
            <View style={styles.container}>
                <View>
                    <Histogram
                        data={this.state.data}
                        height={200}
                        width={300}
                        split={20}
                    />
                </View>
            </View>
        );
    }
});
