import React, { Component, Fragment } from 'react';
import axios from 'axios';
import DataTable from './dataTable';

let pageNumber = 0;

const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

let columns = [{
  id: 'id',
  label: 'Id',
  numeric: true,
  width: '20px'
},{
  id: 'title',
  label: 'Title',
  numeric: false,
  width: '30%',
},{
  id: 'url',
  label: 'Url',
  numeric: false,
  // width: '20%',
  type: 'url'
},{
  id: 'thumbnailUrl',
  label: 'ThumbnailUrl',
  numeric: false,
  type: 'image'
}];


export default class Container extends Component {

  constructor() {
		super();
		this.state = {
			data: [],
      loading: true
		};
	}

  componentDidMount(){
    this.appendPage();
    window.onscroll = debounce(() => {
      alert(window.innerHeight + document.documentElement.scrollTop + "-" + document.documentElement.offsetHeight);
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        this.appendPage();
      }
    }, 300)
  }

  appendPage = () => {
    this.setState({loading: true},()=>{
      ++pageNumber;
      axios.get('https://jsonplaceholder.typicode.com/photos').then((data)=>{
        if(data && data.data){
          this.setState({data: data.data.slice(0, pageNumber*50), loading: false});
        }
      });
    })
  }

  handleRowClick = (data, index) => {
    return()=>{
      console.log('Row clicked --> ' + JSON.stringify(data) + ' --- Index -> ' +index);
    };
  }

  handleSelectionChange = (all) => {
      console.log('All - '+ all);
  }

  render(){
    const { data, loading } = this.state;
    return(
      <Fragment>
        {
          data.length > 0 && <DataTable
            columns={columns}
            rows={data}
            onRowClick={this.handleRowClick}
            onSelectionChange={this.handleSelectionChange}
            />
        }
        {
          loading && <div style={{textAlign: 'center', padding: 10}}>Loading Please Wait...</div>
        }
      </Fragment>
    )
  }
}
