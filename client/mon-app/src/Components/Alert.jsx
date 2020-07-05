import React from 'react';
import {
    Link
  } from "react-router-dom";
import {Alert} from 'react-bootstrap';


export default class Alerting extends React.Component{

  constructor(props){
    super(props);
    this.clearAlert = this.clearAlert.bind(this);
    this.state = {
        opacity: 1,
        alert:this.props.alerting
      }
  }

  clearAlert(){
    var interval = setInterval(() => {
        if(this.state.opacity <= 0){
            this.props.clearAlert();
            clearInterval(interval)
            this.setState({alert:[]})
        }else{
            this.setState({opacity:this.state.opacity - 0.01})
            //document.getElementById("alert").style.opacity = this.state.opacity;
        }
    }, 200);
  }

  render(){
        var opacity = this.state.opacity;
        if(this.state.alert){
            var alert = this.state.alert.map(function(variant, index){
                return <Alert key={index} id="alert" variant='primary' style={{opacity: opacity}}>
                    {variant}
                </Alert>
            });
            if (alert.length > 0){
                this.clearAlert();
            }
        }else{
            var alert = ''
        }
        
        return <div>{alert}</div>

    }

}
