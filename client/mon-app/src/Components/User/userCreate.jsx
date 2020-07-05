import React, { Component } from 'react';
import axios from 'axios';
import {
  Redirect 
} from "react-router-dom";
import {Button, InputGroup, FormControl, Container} from 'react-bootstrap';

export default class UserCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    }
  }
  
    handleChange = event => {
      this.setState({ username: document.querySelector('#create-username').value });
      this.setState({ password: document.querySelector('#create-password').value });
      this.setState({ confirmPassword: document.querySelector('#confirm-password').value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      if(this.state.password == this.state.confirmPassword){
        const user = {
          username: this.state.username,
          password: this.state.password,
          redirect: false
        };
  
        axios.post(`http://localhost:3000/user/create`, { user })
        .then(res => {
          if(res.data != 'User '+this.state.username+' already exist'){
            this.props.funcLogin(res.data);
            this.setState({ redirect: true})
          }
        });
      }
    };
  
    render() {

      const { redirect } = this.state;
      if (redirect) 
        return <Redirect to="/" />;
      return (
        <Container>
          <form onSubmit={this.handleSubmit}>
            <div>Créer un utilisateur:</div>
            <InputGroup className="mb-3">
            <FormControl
                placeholder="Nom d'utilisateur"
                aria-label="Nom d'utilisateur"
                aria-describedby="basic-addon2"
                name="name"
                type="text"
                id="create-username"
                onChange={this.handleChange}
              />
              <FormControl
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                aria-describedby="basic-addon2"
                name="pass"
                type="password"
                id="create-password"
                onChange={this.handleChange}
              />
              <FormControl
                placeholder="Confirmation du mdp"
                aria-label="Confirmation"
                aria-describedby="basic-addon2"
                name="confirmPass"
                type="password"
                id="confirm-password"
                onChange={this.handleChange}
              />
              
              <InputGroup.Append>
                <Button variant="dark" type="submit">Créer</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
        </Container>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!