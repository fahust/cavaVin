import React from 'react';
import Vins from './Vin/vinList.jsx';

export default class Home extends React.Component{

  constructor(props){
    super(props)
  }
render(){
return <div>
    <Vins user={this.props.user} alert={this.props.alert} clearAlert={this.props.clearAlert} addAlert={this.props.addAlert}/>
</div>
}

}