import React, { Fragment } from 'react';

const TableElement = (props) => {
  const { item, tableKeys, index, onRowClick, elemntClick } = props;
  return(
    <tr style={{borderTop: "1px solid #34495e"}} onClick={onRowClick(item, index)}>
      <td>
        <input type="checkbox" checked={item.checked?true:false} onClick={elemntClick(item.id, item.checked, index)}/>
      </td>
      {
        tableKeys.map((content, index)=>{
          return (
            <td key={index} style={{
              textAlign: content.numeric?'right':(content.type == "image")?'center':undefined,
            }}>
              {(content.type == undefined) && item[content.id]}
              {(content.type == "image") && <img src={item[content.id]} height={50}/>}
              {(content.type == "url") && <a href={item[content.id]} target="__blank">{item[content.id]}</a>}
            </td>
          )
        })
      }
    </tr>
  )
}


export default TableElement;
