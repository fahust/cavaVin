import React from 'react';
import {
    Link
  } from "react-router-dom";
import {Alert,Pagination} from 'react-bootstrap';


export default class Paginate extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
        let active = this.props.active;
        let items = [];
        for (let number = 1; number <= this.props.number; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => this.props.newPage(number)}>
            {number}
            </Pagination.Item>,
        );
        }
        
        var paginationBasic = (
        <div>
            <Pagination size="sm">{items}</Pagination>
        </div>
        );
        
        return <div>{paginationBasic}</div>

    }

}
