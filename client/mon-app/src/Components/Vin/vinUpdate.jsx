import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import Header from '../Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, InputGroup, FormControl, Container, Form} from 'react-bootstrap';

export default class VinUpdate extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        add: false,
        name:this.props.location.vin.name,
        desc:this.props.location.vin.desc,
        user:this.props.location.user,
      }
    }
  
    handleChange = event => {
      var name = event.target.name 
      this.setState({[name] : event.target.value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        name: this.props.location.vin.name,
        desc: this.state.desc,
        newName: this.state.name,
        desc: this.state.desc,
        owner: this.state.user
      };
  
      axios.post(`http://localhost:3000/vin/update`, { vin })
        .then(res => {
          if(res.data == 'user expired, pleaze reconect'){
            this.setState({add : true})
            this.props.location.addAlert('La session utilisateur à expirer');
          }
          if (res.data == 'Vin updated'){
            this.props.location.addAlert('Un vin a était modifié');
          }else{
            this.props.location.addAlert(res.data);
          }
          this.setState({add : true})
        });
    };
  
    render() {
      if (this.state.user == undefined || this.state.user == '' || this.state.add == true)
        return <Redirect to="/"/>
      return (<div>         
          <Header place = "addVin" user={this.state.user} alert={this.state.alert} clearAlert={this.props.location.clearAlert}/>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Nom du vin</Form.Label>
                <Form.Control 
                  placeholder="Nom du vin"
                  aria-label="Nom du vin"
                  aria-describedby="basic-addon2"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange} />
              </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3"
                  placeholder="Nom du vin"
                  aria-label="Nom du vin"
                  aria-describedby="basic-addon2"
                  name="desc"
                  type="text"
                  value={this.state.desc}
                  onChange={this.handleChange} />
                </Form.Group>
                  <Button variant="dark" type="submit">Modifier</Button>
            </Form>
          </Container>
        </div>
      )
    }
  }
