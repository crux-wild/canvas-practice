import React from 'react';

class Char extends React.Component {
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

export default Char;
