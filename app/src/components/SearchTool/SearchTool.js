import React, {useState} from 'react';
import { useQuery} from '@apollo/client';
import { GET_TOOLS_BY_NAME} from '../../graphql_const';

export default function SearchTool() {
    
    const [tool,setTool] = useState(); //state was not set to an empty string in order to avoid useQuery
    // fetching queries on every refresh/rerender using '' as search string
    const [toolList,setToolList] = useState('');
    const {data, loading, error} = useQuery(GET_TOOLS_BY_NAME,{variables:{name:tool}});

    function handleChange(event){
        setTool(event.target.value);
        
    };

    function handleSubmit(event){
        event.preventDefault()
        console.log(event.target)
        console.log('Tool name to be searched: ',tool)
        console.log(data)

        setToolList(JSON.stringify(data,null, 2))
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
          <code>{toolList}</code>
      </div>
    
  );
}