import React, { Component, Fragment } from 'react';
import TableElement from './tableElement';

export default class DataTable extends Component {

  constructor(){
    super();
    this.state = {
      tableData: [],
      allCheck: false,
      tableKeys: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      tableData: props.rows,
      tableKeys: props.columns
    }
  }

  handleAllCheck = () => {
    let { allCheck, tableData } = this.state;
    tableData.forEach((item)=>{
      item.checked = !allCheck;
    });
    this.setState({allCheck: !allCheck, tableData: tableData}, ()=>{
      this.props.onSelectionChange(this.state.allCheck);
    });
  }

  handleElementClick = (id, checked = false, position) => {
    return()=>{
      let { tableData } = this.state;
      let currentData = tableData[position];
      currentData.checked = !checked;
      tableData.splice(position,1, currentData);
      let allTrue = true;
      tableData.forEach((item)=>{
        if(!item.checked){
          allTrue = false;
        }
      });
      this.setState({tableData: tableData, allCheck: allTrue});
    }
  }

  handleSearch = (e) => {
    this.setState({search: e.target.value});
  }

  render(){
    const { tableData, allCheck, tableKeys, search } = this.state;

    return(
      <div style={{background: "#fff", border: "1px solid #ecf0f1", margin: 10, borderRadius: 3}}>

          <div style={{borderBottom: '1px solid #bdc3c7'}}>
            <div style={{padding: 10, borderBottom: '1px solid #2980b9', width: 20}}>All</div>
          </div>

          <div style={{padding: 10, textAlign: 'center'}}>
            <input type="text" className="search" placeholder="Search Title" onChange={this.handleSearch} value={search}/>
          </div>

          <table>
            <tr>
              <th className="capitalize" style={{width: 10, padding: 10}}>
                <input type="checkbox" checked={allCheck} onChange={this.handleAllCheck} />
              </th>
              {
                tableKeys.map((item, index)=>{
                  return <th
                      key={index}
                      className="capitalize"
                      style={{width: item.width?item.width:undefined, padding: 10}}
                    >
                    {item.label}
                    </th>
                })
              }
            </tr>
              {
                tableData.map((item, index)=>{
                  return <TableElement
                    item={item}
                    key={index}
                    index={index}
                    tableKeys={tableKeys}
                    elemntClick={this.handleElementClick}
                    onRowClick={(item, index)=>this.props.onRowClick(item, index)}
                    />
                })
              }
          </table>
      </div>
    )
  }
}
