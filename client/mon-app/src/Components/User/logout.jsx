import React, { Component } from 'react';
import axios from 'axios';
import {
  Link,
  Redirect 
} from "react-router-dom";

export default class UserCreate extends React.Component {
  constructor(props){
    super(props);
    this.props.funcLogout();
  }
  
    render() {
        return <div>
          <Redirect to="/" />
        </div>
    }
  }


//export default Slider; // Don’t forget to use export default!