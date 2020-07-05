import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, InputGroup, FormControl, Container, Form} from 'react-bootstrap';

export default class VinAdd extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        desc: '',
        add: false,
      }
    }
  
    handleChange = event => {
      var name = event.target.name 
      this.setState({[name] : event.target.value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        name: this.state.name,
        desc: this.state.desc,
        owner: this.props.user
      };
  
      axios.post(`http://localhost:3000/vin/add`, { vin })
        .then(res => {
          if (res.data == 'Vin created'){
            this.props.addAlert('Un vin a était ajouté');
          }else{
            this.props.addAlert(res.data);
          }
          this.setState({add : true})
        });
    };
  
    render() {
      if (this.props.user == undefined || this.props.user == '' || this.state.add == true)
        return <Redirect to="/"/>
      return (
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
                onChange={this.handleChange} />
            </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" 
                placeholder="Description du vin"
                aria-label="Description du vin"
                aria-describedby="basic-addon2"
                name="desc"
                type="text"
                onChange={this.handleChange} />
              </Form.Group>
                <Button variant="dark" type="submit">Ajouter</Button>
          </Form>
        </Container>
      )
    }
  }
