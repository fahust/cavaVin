import React from 'react';
import {
    Link
  } from "react-router-dom";
import {Nav, Navbar, link, InputGroup, FormControl} from 'react-bootstrap';
import Alerting from './Alert.jsx';


export default class Header extends React.Component{

  constructor(props){
    super(props);
  }

  headerTitle(){
    if( this.props.user == ''){
      var login = <Link to="/login">Ce connecter</Link>;
      var register = <Nav.Item>
      <Link to="/register">s'inscrire</Link>
    </Nav.Item>
    }else{//funcLogout
      var login = <Link to="/logout">Ce déconnecter</Link>;
      var register = <Nav.Item>
          <Link to="/addVin">Ajouter un vin</Link>
        </Nav.Item>
      var register2 = <Nav.Item>
      <Link to="/searchVin">Chercher un vin</Link>
    </Nav.Item>
      var register3 = <Nav.Item>
      <Link to="/searchVinCommunity">Chercher un vin de la communauté</Link>
    </Nav.Item>
    }

      return <div><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <Link to="/">CavaVin</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav.Item>
        {login}
      </Nav.Item>
      {register}
      {register2}
      {register3}
      
    
      </Navbar.Collapse>
    </Navbar>
    <br />
        <Alerting alerting={this.props.alert} clearAlert={this.props.clearAlert}/>
    <br />
    </div>
  }

render(){
  var header = this.headerTitle();
return <nav>
  {header}
</nav>
}

}