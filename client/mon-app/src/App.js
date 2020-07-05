import React from 'react';
import Vinadd from './Components/Vin/vinAdd.jsx';
import Vin from './Components/Vin/vin.jsx';
import Vintag from './Components/Vin/vinAddTag.jsx';
import Vinsearch from './Components/Vin/vinSearch.jsx';
import Vinupdate from './Components/Vin/vinUpdate.jsx';
import UserCreate from './Components/User/userCreate.jsx';
import UserConnect from './Components/User/userConnect.jsx';
import VinsearchCommunity from './Components/Community/vinComSearch.jsx';
import Home from './Components/Home.jsx';
import Logout from './Components/User/logout.jsx';
import Header from './Components/Header';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      user:'',
      alert: []
    }
    this.changeSessionUser = this.changeSessionUser.bind(this);
    this.logout = this.logout.bind(this);
    this.addAlert = this.addAlert.bind(this);
    this.clearAlert = this.clearAlert.bind(this);
  }

  changeSessionUser(data){
    this.setState({user:data});
  }

  logout(){
    if(this.state.user != '')
      this.setState({user:''});
  }

  addAlert(newelement){
    var prevState = this.state.alert;
    prevState.push(newelement);
    this.setState({ alert: prevState })
    return this.state.alert;
  }

  clearAlert(){
    this.setState({alert:[]})
  }

  render(){
    return <div>
        <Router>
          <Switch>
            <Route path="/addVin">
              <Header place = "addVin" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <Vinadd user={this.state.user} addAlert={this.addAlert} />
            </Route>
            <Route path="/updateVin" component={Vinupdate} />
            <Route path="/searchVin">
              <Header place = "searchVin" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <Vinsearch user={this.state.user} addAlert={this.addAlert} alert={this.state.alert}/>
            </Route>
            <Route path="/searchVinCommunity">
              <Header place = "searchVinCommunity" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <VinsearchCommunity user={this.state.user} addAlert={this.addAlert} alert={this.state.alert}/>
            </Route>
            <Route path="/addVinTag">
              <Header place = "addVinTag" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <Vintag user={this.state.user} addAlert={this.addAlert}/>
            </Route>
            <Route path="/getVin" component={Vin} />

            <Route path="/register">
              <Header place = "register" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <UserCreate user={this.state.user}  funcLogin={this.changeSessionUser} addAlert={this.addAlert}/>
            </Route>
            <Route path="/login">
              <Header place = "login" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <UserConnect user={this.state.user} funcLogin={this.changeSessionUser} addAlert={this.addAlert}/>
            </Route>
            <Route path="/logout">
              <Header place = "logout" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <Logout user={this.state.user} funcLogout={this.logout} addAlert={this.addAlert}/>
            </Route>
            <Route path="/" user={this.state.user}>
              <Header place = "" user={this.state.user} alert={this.state.alert} clearAlert={this.clearAlert}/>
                <Home user={this.state.user} addAlert={this.addAlert} alert={this.state.alert} clearAlert={this.clearAlert}/>
            </Route>
          </Switch>
      </Router>
    </div>
  }
}
