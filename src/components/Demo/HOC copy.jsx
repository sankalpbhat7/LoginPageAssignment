import React, { Component } from 'react';

class MyComponent extends Component{
  constructor(props) {
    super(props);
}

  render() {
    return (
      <h1>{`Sankalp has ${this.props.car}`}</h1>
    );
  }
}

const HigherOrderComp = MyComp => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: 'Mercedes',
    }
  }

  render() {
    return (
      <MyComp car={this.state.car}/>
    );
  }
}

export default HigherOrderComp(MyComponent);
