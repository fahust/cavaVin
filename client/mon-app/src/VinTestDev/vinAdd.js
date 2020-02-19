import React, { Component } from 'react';
import axios from 'axios';

export default class VinAdd extends React.Component {
    state = {
      name: '',
    }
  
    handleChange = event => {
      this.setState({ name: event.target.value });
      this.setState({ owner: window.ownerConnect });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        name: this.state.name,
        owner: this.state.owner
      };
  
      axios.post(`http://localhost:3000/vin/add`, { vin })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Ajouter un vin:</div>
            <label>
              <div>
                Nom:
                <input type="text" name="name" onChange={this.handleChange} />
              </div>
              <div>
                Nom:
                <input type="text" name="name" onChange={this.handleChange} />
              </div>
            </label>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!