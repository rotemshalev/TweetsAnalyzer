import React from 'react';
import './topItems.css';

const TopItems = ({ items }) => {
  console.log(items)
  return (
    <div className="topItems">
      {
        items.length > 0 ? (items.map(item => <div className="item">{`${item[0]} - ${item[1]}`}</div>)) : (<div className="item">loading...</div>)
      }
    </div>
  )
}

export default TopItems;