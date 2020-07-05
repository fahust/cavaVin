import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {Button, InputGroup, FormControl, Badge} from 'react-bootstrap';

export default class VinDelTag extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.vin.name,
      tag: '',
    }
  }
  
    handleChange = event => {
      this.setState({ tag: document.querySelector('#Tag-push-tag').value });
    }
  
    handleSubmit = event => {
      const vin = {
        name: this.state.name,
        newTag: this.props.tag,
        owner: this.props.user
      };
  
      axios.post(`http://localhost:3000/vin/tag/delete/`, { vin })
        .then(res => {
          //this.props.addAlert('Un tag a était supprimé');
          this.props.actualiz(res.data);
        });
    };
  
    render() {
      if (this.props.user == undefined || this.props.user == '')
        return <Redirect to="/Logout"/>
      return (
            <a href="javascript:"><Badge variant="warning" onClick={this.handleSubmit}>Supprimer un tag</Badge></a>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!