import React, { Component } from 'react';
import axios from 'axios';
import {
  Link , Redirect
} from "react-router-dom";
import {Button, Image, Col, ListGroup, Container } from 'react-bootstrap';
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
    
    const vin = {
      owner: this.props.user,
      page: this.state.active
    };

    axios.post(`http://localhost:3000/vin/list`, { vin })
      .then(res => {
        if(res.data == 'user expired, pleaze reconect'){
          this.setState({owner: undefined})
          this.props.addAlert('La session utilisateur à expirer');
        }
        this.state.number = Math.ceil(res.data.total/this.state.byPage)
        this.setState({vins:res.data.vins});
      });
  }

    newPage(page){
      const vin = {
        owner: this.props.user,
        page: page
      };
  
      axios.post(`http://localhost:3000/vin/list`, { vin })
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
  
  
    render() {
      if (this.state.owner == undefined || this.state.owner == '')
        return <Redirect to="/"/>
      if (this.state.vins && this.state.vins.length > 0 && Array.isArray(this.state.vins)){
        var title = <div>Vos vins :</div>;
        var vins = this.state.vins.map((vin) => {
          return <ListGroup.Item key={vin._id}><Link to={{
            pathname: '/getVin',
            vin:vin,
            user:this.props.user,
            alert:this.props.alert,
            clearAlert:this.props.clearAlert,
            addAlert:this.props.addAlert,
          }}  >{vin.name} ({vin.rating ?? 0} / 5)</Link></ListGroup.Item>
        })
      }else{
        var vins = '';
        var title = '';
      }

      if(this.state.number == 0){
        var pagination = ''
      }else{
        var pagination = <Pagination active={this.state.active} number={this.state.number} newPage={this.newPage}/>
      }

      return (
        <Container>
          {title}
          <ListGroup variant="flush">
          {vins}
          </ListGroup>
          {pagination}
        </Container>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!