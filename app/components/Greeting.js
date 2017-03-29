import React from 'react';

let temp;

export default class Greeting extends React.Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0,
      isVisible: true,
      people: [
        {
          name: 'John Doe',
          kills: 0
        },
        {
          name: 'Peter Pan',
          kills: 0
        }
      ]
    };
  }

  counterClicker() {
    let newCounter = this.state.counter + 1;
    let people = [...this.state.people];

    const newPeople = this.state.people.map((value, i) => {
      return people[i] = Object.assign({}, people[i], {kills: newCounter});
    });
    this.setState({
      counter: newCounter,
      people: newPeople
    });
  }


  toggleVisible() {
    let newVisible = !this.state.isVisible;
    this.setState({
      isVisible: newVisible
    });

  }

  createPeople() {
    const lis = this.state.people.map((value, i) => {
      return <li key={value.name + i}>{value.name} {value.kills}</li>
    });
    return (
      <ul>{lis}</ul>
    )
  }

  render() {
    let counterElm = this.state.isVisible && <span>Counter: {this.state.counter}</span>;
    return (
      <div>
        <h1>Song Cloud</h1>

        <h2>Hi, my name is {this.props.data.name} and my age is {this.props.data.age}</h2>

        {counterElm}

        <br/>
        <button onClick={() => this.counterClicker()}>{this.props.data.counterBtnName}</button>

        <br/>
        <button onClick={() => this.toggleVisible()}>{this.props.data.toggleVisible}</button>

        {this.createPeople()}
      </div>
    )
  }
}










