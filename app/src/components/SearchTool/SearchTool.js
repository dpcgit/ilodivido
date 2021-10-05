import React, {useState, useEffect} from 'react';
import { useQuery} from '@apollo/client';
import { GET_TOOLS_BY_NAME, GET_TOOLS_BY_USER} from '../../graphql_const';

export default function SearchTool({user_name}) {
    
    const [tool,setTool] = useState(); //state was not set to an empty string in order to avoid useQuery
    // fetching queries on every refresh/rerender using '' as search string
    const [toolList,setToolList] = useState('');
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
        console.log(a)
        const string_obj = await JSON.stringify(a.data,null, '\t')
        //console.log('Tool string', string_obj)
        await setToolList(string_obj)        
        //console.log('Tool list', toolList)
    }

    return(
      <div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <label>
                <p>Search</p>
                <input type='text' name='tool' onChange={e=>handleChange(e)}></input>
            </label>
            <button type='submit'>Search</button>            
          </form>
          <pre>{toolList}</pre>
      </div>
    
  );
}