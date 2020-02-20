import React, { Component } from 'react';
import axios from 'axios';

export default class UserCreate extends React.Component {
    state = {
      username: '',
      password: '',
    }
  
    handleChange = event => {
      this.setState({ username: document.querySelector('#connect-username').value });
      this.setState({ password: document.querySelector('#connect-password').value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const user = {
        username: this.state.username,
        password: this.state.password
      };
  
      axios.post(`http://localhost:3000/user/connect`, { user })
        .then(res => {
          window.ownerConnect = res.data;
          console.log(window.ownerConnect);//dario faut trouver un moyen de faire des variable global car dans la window on peut visiblement creer une variable qu'une fois et du coup l'user est obligé d'actualiser la page alors qu'il faudrais juste qu'il puisse ce reconnecter sans changer la page
        });
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Connection:</div>
            <label>
              <div>
                username:
                <input id="connect-username" type="text" name="name" onChange={this.handleChange} />
              </div>
              <div>
                password:
                <input id="connect-password" type="text" name="name" onChange={this.handleChange} />
              </div>
            </label>
            <button type="submit">Connecter</button>
          </form>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!