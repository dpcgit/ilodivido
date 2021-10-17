//https://reactrouter.com/web/example/modal-gallery

import React, {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setToolList } from '../App/AppSlice'
import { useQuery} from '@apollo/client';
import { GET_TOOLS_BY_NAME, GET_TOOLS_BY_USER} from '../../graphql_const';
import ToolMiniature from '../ToolMiniature/ToolMiniature';
import Tool from '../Tool/Tool'

export default function SearchTool({user_name}) {

    const [tool,setTool] = useState(); //state was not set to an empty string in order to avoid useQuery
    // fetching queries on every refresh/rerender using '' as search string
    const dispatch = useDispatch();
    const toolList = useSelector((state)=>state.app.tool_list)
    const {data, loading, error} = useQuery(GET_TOOLS_BY_NAME,{variables:{name:tool}});
    const a = useQuery(GET_TOOLS_BY_USER,{variables:{toolsByUserUser:user_name}, fetchPolicy: 'network-only'});

    function handleChange(event){
        setTool(event.target.value);

    };

      async function handleSubmit(event){
        event.preventDefault()
        console.log(event.target)
        console.log('Tool name to be searched: ',tool)
        //console.log(data)
        console.log(a.data.tools_by_user)
        //const string_obj = await JSON.stringify(a.data,null, '\t')
        //console.log('Tool string', string_obj)
        //await setToolList(a.data.tools_by_user)
        //console.log('Tool list', toolList)
        await dispatch(setToolList({tool_list:a.data.tools_by_user}))
    }

    return(
      <div>
          <Route path="/search-tool/:username/:tool" children={<Tool/>}>
          </Route>
          <Route exact path="/search-tool">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <label>
                  <p>Search</p>
                  <input type='text' name='tool' onChange={e=>handleChange(e)}></input>
              </label>
              <button type='submit'>Search</button>
            </form>
            {toolList.map((tool)=>(
              <ToolMiniature tool={tool} username={user_name}/>
            ))}
          </Route>
      </div>

  );
}
