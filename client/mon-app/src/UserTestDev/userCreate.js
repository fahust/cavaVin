import React, { Component } from 'react';
import axios from 'axios';

export default class UserCreate extends React.Component {
    state = {
      username: '',
      password: '',
    }
  
    handleChange = event => {
      this.setState({ username: document.querySelector('#create-username').value });
      this.setState({ password: document.querySelector('#create-password').value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const user = {
        username: this.state.username,
        password: this.state.password
      };
  
      axios.post(`http://localhost:3000/user/create`, { user })
        .then(res => {
          console.log(res);
          console.log(res.data);
        });
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Créer un utilisateur:</div>
            <label>
              <div>
                username:
                <input id="create-username" type="text" name="name" onChange={this.handleChange} />
              </div>
              <div>
                password:
                <input id="create-password" type="text" name="name" onChange={this.handleChange} />
              </div>
            </label>
            <button type="submit">Créer</button>
          </form>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!