import React, { Component } from 'react';
import axios from 'axios';

export default class VinSearch extends React.Component {
    state = {
      name: '',
    }
    state2 = {
      name: '',
    }
  
    handleChange = event => {
      this.setState({ name: event.target.value });
      this.setState({ owner: window.ownerConnect });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        key: this.state.name,
        owner: this.state.owner
      };
  
      axios.post(`http://localhost:3000/vin/search`, { vin })
        .then(res => {
          console.log(res);
          console.log(res.data);
          document.querySelector('#returnSearch').innerHTML = '';
          res.data.forEach(vin => {
            document.querySelector('#returnSearch').innerHTML += '<div>'+vin.name+'</div>';
          });
        });
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Chercher un vin:</div>
            <label>
              <div>
                Nom:
                <input type="text" name="name" onChange={this.handleChange} />
              </div>
            </label>
            <button type="submit">Chercher</button>
          </form>
        <div id="returnSearch">

        </div>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!