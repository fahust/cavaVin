import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {Button, InputGroup, FormControl} from 'react-bootstrap';

export default class VinAddTag extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.vin.name,
      tag: '',
    }
  }
  
  handleChange = event => {
    this.setState({ tag: event.target.value });
  }
  
    handleSubmit = event => {
      event.preventDefault();
      const vin = {
        name: this.state.name,
        newTag: this.state.tag,
        owner: this.props.user
      };
      axios.post(`http://localhost:3000/vin/tag/add`, { vin })
        .then(res => {
          //this.props.addAlert('Un tag a était ajouté');
          //this.props.newAlert('Un tag a était ajouté')
          this.props.actualiz(res.data);
        });
    };
  
    render() {
      if (this.props.user == undefined || this.props.user == '')
        return <Redirect to="/"/>
      return (
          <form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Nom du tag"
                aria-label="Nom du tag"
                aria-describedby="basic-addon2"
                name="tag"
                type="text"
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button variant="info" type="submit">Ajouter</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!