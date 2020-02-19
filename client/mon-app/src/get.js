import React, { Component } from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/test`)
      .then(res => {console.log(res);
        const persons = res.data;
        this.setState({ persons });
        console.log(this.state.persons);
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons}
      </ul>
    )
  }
}