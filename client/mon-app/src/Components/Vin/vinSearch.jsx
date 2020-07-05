import React, { Component } from 'react';
import axios from 'axios';
import {
  Link , Redirect
} from "react-router-dom";
import {Button, InputGroup, FormControl, Container, ListGroup} from 'react-bootstrap';
import Pagination from '../Pagination.jsx';

export default class VinSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      vins: [],
      number: 0,
      active: 1,
      byPage: 5,
      owner: this.props.user,
    }
    this.newPage = this.newPage.bind(this);
  }
  
    handleChange = event => {
      this.setState({ name: event.target.value });
    }

    newPage(page){
      const vin = {
        key: this.state.name,
        owner: this.props.user,
        page: page,
      };
  
      axios.post(`http://localhost:3000/vin/search`, { vin })
        .then(res => {
          if(res.data == 'user expired, pleaze reconect'){
            this.setState({owner: undefined})
            this.props.addAlert('La session utilisateur à expirer');
          }
          this.state.number = Math.ceil(res.data.total/this.state.byPage)
          this.state.active = page;
          this.setState({vins:res.data.vins});
        });
    }
  
    handleSubmit = event => {
      event.preventDefault();
  
      const vin = {
        key: this.state.name,
        owner: this.props.user,
        page: 1
      };
  
      axios.post(`http://localhost:3000/vin/search`, { vin })
        .then(res => {
          if(res.data == 'user expired, pleaze reconect'){
            this.setState({owner: undefined})
            this.props.addAlert('La session utilisateur à expirer');
          }
          this.state.number = Math.ceil(res.data.total/this.state.byPage)
          this.state.active = 1;
          this.setState({vins:res.data.vins});
        });
    };
  
    render() {
      if (this.state.owner == undefined || this.state.owner == '')
        return <Redirect to="/Logout"/>
        if (this.state.vins && this.state.vins.length > 0 && Array.isArray(this.state.vins)){
          var vins = this.state.vins.map((vin) => {
            return <ListGroup.Item key={vin._id}><Link to={{
              pathname: '/getVin',
              vin:vin,
              user:this.props.user,
              alert:this.props.alert,
              clearAlert:this.props.clearAlert,
              addAlert:this.props.addAlert,
            }}  >{vin.name}</Link></ListGroup.Item>
          })
        }else{
          var vins = ''
        }

      if(this.state.number == 0){
        var pagination = ''
      }else{
        var pagination = <Pagination active={this.state.active} number={this.state.number} newPage={this.newPage}/>
      }

      return (
        <Container>
          <form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Chercher un vin"
                aria-label="Chercher un vin"
                aria-describedby="basic-addon2"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button variant="dark" type="submit">Chercher</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
          <ListGroup variant="flush">
            {vins}
          </ListGroup>
          {pagination}
        </Container>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!