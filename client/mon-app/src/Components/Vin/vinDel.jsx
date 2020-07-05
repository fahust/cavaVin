import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {Button, InputGroup, FormControl} from 'react-bootstrap';

export default class VinDel extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        deleted:false,
      }
      this.deleteVin = this.deleteVin.bind(this);
    }

    deleteVin = event => {
      event.preventDefault();
      const vin = {
        vin: this.props.vin,
        owner: this.props.user
      };
      axios.post(`http://localhost:3000/vin/delete/`, { vin })
        .then(res => {
          this.props.addAlert('Un vin a était supprimé');
          this.setState({deleted : true})
        });
    }
  
    render() {
      if (this.state.deleted == true)
        return <Redirect to="/"/>
      return (
          <form onSubmit={this.deleteVin}>
              <div><Button variant="danger" type="submit">Supprimer ce vin</Button></div>
            
          </form>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!