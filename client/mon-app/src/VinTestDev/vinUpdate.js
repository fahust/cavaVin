import React, { Component } from 'react';
import axios from 'axios';

export default class VinUpdate extends React.Component {
    state = {
      name: '',
      newName: '',
    }
  
    handleChange = event => {
      this.setState({ name: document.querySelector('#Update-push-name').value });
      this.setState({ newName: document.querySelector('#Update-push-newName').value });
      this.setState({ owner: window.ownerConnect });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        name: this.state.name,
        newName: this.state.newName,
        owner: this.state.owner
      };
  
      axios.post(`http://localhost:3000/vin/update`, { vin })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Modifier un vin:</div>
            <label>
              <div>
                Nom Actuel:
                <input id="Update-push-name" type="text" name="name" onChange={this.handleChange} />
              </div>
              <div>
                Nouveau Nom:
                <input id="Update-push-newName" type="text" name="Name" onChange={this.handleChange} />
              </div>
            </label>
            <button type="submit">Modifier</button>
          </form>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!