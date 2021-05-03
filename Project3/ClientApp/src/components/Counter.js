import React, { Component } from 'react';
import {
    Histogram,
    DensitySeries,
    BarSeries,
    withParentSize,
    XAxis,
    YAxis
} from "@data-ui/histogram";
const ResponsiveHistogram = withParentSize(
    ({ parentWidth, parentHeight, ...rest }) => (
        <Histogram width={parentWidth} height={parentHeight} {...rest} />
    )
);
const data1 = [1,2,3,4,5]
function Counter({ data } ) {

    return (
        <div className="App" style={{ height: 300 }}>
            <ResponsiveHistogram
                ariaLabel="histogram"
                orientation="vertical"
                cumulative={false}
                normalized={true}
                binCount={25}
                valueAccessor={(datum) => datum}
                binType="numeric"
                renderTooltip={({ event, datum, data, color }) => (
                    <div>
                        <strong style={{ color }}>
                            {datum.bin0} to {datum.bin1}
                        </strong>
                        <div>
                            <strong>count </strong>
                            {datum.count}
                        </div>
                        <div>
                            <strong>cumulative </strong>
                            {datum.cumulative}
                        </div>
                        <div>
                            <strong>density </strong>
                            {datum.density}
                        </div>
                    </div>
                )}
            >
                <BarSeries animated rawData={data} />
                <XAxis />
                <YAxis />
            </ResponsiveHistogram>
        </div>
    );
}

export default Counter

//export class Counter extends Component {
//  static displayName = Counter.name;

//  constructor(props) {
//    super(props);

//  }


//  render() {
//    return (
//      <div>
//            <App />
//      </div>
//    );
//  }
//}