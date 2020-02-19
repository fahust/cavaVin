import React, { Component } from 'react';
import axios from 'axios';

export default class VinAddTag extends React.Component {
    state = {
      name: '',
      tag: '',
    }
  
    handleChange = event => {
      this.setState({ name: document.querySelector('#Tag-push-name').value });
      this.setState({ tag: document.querySelector('#Tag-push-tag').value });
      this.setState({ owner: window.ownerConnect });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        name: this.state.name,
        newTag: this.state.tag,
        owner: this.state.owner
      };
  
      axios.post(`http://localhost:3000/vin/tag/add`, { vin })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Ajouter un tag:</div>
            <label>
              <div>
                Nom du vin:
                <input id="Tag-push-name" type="text" name="name" onChange={this.handleChange} />
              </div>
              <div>
                Nouveau Tag:
                <input id="Tag-push-tag" type="text" name="name" onChange={this.handleChange} />
              </div>
            </label>
            <button type="submit">Ajouter un tag</button>
          </form>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!