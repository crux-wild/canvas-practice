import React from 'react';

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <canvas id={this.props.id}
        width={this.props.witdh} height={this.props.height}
      >
      </canvas>
    );
  }
}

export default Chart;
