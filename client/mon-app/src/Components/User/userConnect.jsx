import React, { Component } from 'react';
import axios from 'axios';
import {
  Link,
  Redirect 
} from "react-router-dom";
import {Button, InputGroup, FormControl, Container} from 'react-bootstrap';

export default class UserCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    }
  }
  
    handleChange = event => {
      this.setState({ username: document.querySelector('#connect-username').value });
      this.setState({ password: document.querySelector('#connect-password').value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      const user = {
        username: this.state.username,
        password: this.state.password,
      };
  
      axios.post(`http://localhost:3000/user/connect`, { user })
        .then(res => {
          this.props.funcLogin(res.data);
          this.setState({ redirect: true})
        });
    };
  
    render() {
      const { redirect } = this.state;
      if (redirect) 
        return <Redirect to="/" />;
      return (
        <Container>
          <form onSubmit={this.handleSubmit}>
              <div>Connection:</div>
              <InputGroup className="mb-3">
            <FormControl
                placeholder="Nom d'utilisateur"
                aria-label="Nom d'utilisateur"
                aria-describedby="basic-addon2"
                name="name"
                type="text"
                id="connect-username"
                onChange={this.handleChange}
              />
              <FormControl
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                aria-describedby="basic-addon2"
                name="pass"
                type="password"
                id="connect-password"
                onChange={this.handleChange}
              />
              
              <InputGroup.Append>
                <Button variant="dark" type="submit">Connecter</Button>
              </InputGroup.Append>
            </InputGroup>
            <Link to="/register">
              <Button variant="secondary" >S'inscrire</Button>
            </Link>
            <Link to="/">
              <Button variant="warning" >Mot de passe perdu</Button>
            </Link>
          </form>
        </Container>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!