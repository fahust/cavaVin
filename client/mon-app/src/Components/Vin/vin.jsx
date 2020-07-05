import React from 'react';
import Header from '../Header';
import Tag from './vinAddTag';
import DelTag from './vinDelTag';
import Delvin from './vinDel';
import Uploader from './vinImage';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Image, Col, ListGroup, Container } from 'react-bootstrap';
//import ImageUploader from 'react-images-upload';
import {Redirect, Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';

export default class Vin extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        vin: this.props.location.vin,
        user: this.props.location.user,
        img:'',
        alert:this.props.location.alert,
      }
      const vin = {
        vin: this.state.vin,
        owner: this.state.user
      };
      axios.post("http://localhost:3000/vin/view/", {vin})
          .then((response) => {
            if(response.data.imageBuffer)
              this.setState({img:response.data.imageBuffer})
          }).catch((error) => {
      });
      this.actualiz = this.actualiz.bind(this);
      this.loadImage = this.loadImage.bind(this);
      this.newAlert = this.newAlert.bind(this);
      this.changeRating = this.changeRating.bind(this);
    }

  
    handleChange = event => {
      this.setState({ name: event.target.value });
    }
  
    actualiz(vin){
      this.setState({vin:vin})
    };

    loadImage(img){
      this.setState({img:img})
    };

    newAlert(alert){
      var prevState = this.state.alert;
      prevState.push(alert);
      this.setState({ alert: prevState })
    };

    changeRating( newRating, name ) {
      var vin = this.state.vin;
      vin.rating = newRating;
      this.setState({
        vin: vin
      });
      var vin = {
        vin: this.state.vin,
        owner: this.state.user
      };
      console.log(vin)
      axios.post(`http://localhost:3000/vin/rating`, { vin })
        .then(res => {
        });
    }
  
    render() {
      if (this.props.location.user == undefined || this.props.location.user == '')
        return <Redirect to="/Logout"/>
      var tags = '';
      if (this.state.vin.tags){
        tags=this.state.vin.tags.map((tag,i) => {
          return <ListGroup.Item key={i}><DelTag user={this.state.user} vin={this.state.vin} tag={tag} actualiz={this.actualiz} addAlert={this.props.location.addAlert} newAlert={this.newAlert}/> {tag} </ListGroup.Item>
        })
      }

      let file  = this.state.img;

      if(this.props.location.owned){
        var owned = ''
      }else{
        var owned = <div>
          <StarRatings
                  rating={this.state.vin.rating}
                  starRatedColor="blue"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="5px"
                />
                <br />
                <br />
                <br />
                <ListGroup variant="flush">{tags}</ListGroup>
              <label>
                <div>
                  <Tag vin={this.state.vin} user={this.state.user} actualiz={this.actualiz} addAlert={this.props.location.addAlert} newAlert={this.newAlert}/>
                </div>
              </label>
              <Uploader user={this.state.user} vin={this.state.vin} loadImage={this.loadImage} addAlert={this.props.location.addAlert} newAlert={this.newAlert}/>
              <Button variant="warning"><Link to={{
              pathname: '/updateVin',
              vin:this.state.vin,
              user:this.state.user,
              addAlert:this.props.location.addAlert,
            }}  >Modifier ce vin</Link></Button>
              <Delvin user={this.state.user} vin={this.state.vin} addAlert={this.props.location.addAlert} newAlert={this.newAlert}/>
        </div>
      }

      return (
        <div>
        <Header place = "addVin" user={this.state.user} alert={this.state.alert} clearAlert={this.props.location.clearAlert}/>
        <Container>
              <div>
                <Image width="100"
                  src={`data:image/png;base64,${Buffer.from(file).toString('base64')}`}
                  rounded />
                {this.state.vin.name}
              </div>
              <br />
              {owned}
              
      </Container>
      </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!