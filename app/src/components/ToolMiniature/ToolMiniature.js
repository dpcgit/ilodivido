import React from 'react';
import { Link, Route } from 'react-router-dom';
import Tool from '../Tool/Tool'
import { useDispatch} from 'react-redux';
import { setSelectedTool } from '../App/AppSlice'

export default function ToolMiniature({tool,username}) {

    const dispatch = useDispatch();

    function handleClick(e){
        dispatch(setSelectedTool({selected_tool:tool}))
    }
    
    return(
      <div>
          <Link to={`/search-tool/${username}/${tool.name}`} onClick={handleClick}>
            <p>{tool.name}</p>
            <img src={tool.pictures[0]} name={tool.name} width="400" height="400"/>
          </Link>
      </div>
  );
}
