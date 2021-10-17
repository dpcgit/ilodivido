import React from 'react';
import { useSelector } from 'react-redux';

export default function Tool() {
    const selected_tool = useSelector((state)=>state.app.selected_tool)
    console.log('Selected tool:', selected_tool)
    return(
      <div>
          <a>
            <p>{selected_tool.name}</p>
            <img src={selected_tool.pictures[0]} name={selected_tool.name} width="400" height="400"/>
          </a>
      </div>
  );
}
