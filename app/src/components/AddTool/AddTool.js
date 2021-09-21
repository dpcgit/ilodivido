import { useMutation} from '@apollo/client';
import React, {useState} from 'react';
import { ADD_TOOL} from '../../graphql_const';
//import { Link } from 'react-router-dom';
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// https://www.apollographql.com/docs/react/data/mutations/
//https://www.apollographql.com/docs/react/get-started/
//https://medium.com/nerd-for-tech/how-to-build-forms-with-multiple-input-fields-using-react-hooks-677da2b851aa
// https://buddy.works/tutorials/how-to-connect-mongodb-to-graphql-server
// https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react
//https://medium.com/@enespalaz/file-upload-with-graphql-9a4927775ef7

export default function AddTool({user_name}) {

  const [tool,setTool] = useState({ name:"",
                                    description:"",
                                    power_tool:'',
                                    hourly_price:'',
                                    price:'',
                                    pictures:'',
                                    location:''
    });
  const [toolPicture,setToolPicture] = useState('null');
  
  const [addTool, { data, loading, error }] = useMutation(ADD_TOOL);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
   
  async function handleSubmit(event){
    event.preventDefault();
    console.log('File to be submited: ', toolPicture)
    console.log('User to be modified: ',user_name)
    await addTool({variables:{addToolInput:tool,addToolUsername:user_name,file:toolPicture}});
    console.log('tool added')
  };

  function handleChange(event){
    setTool({...tool,[event.target.name]:event.target.value});
    };

  return(
    <div className="add-tool-wrapper">
        <h1>Add Tool</h1>
        <p>Username to be modified: {user_name}</p> 
        <form onSubmit={e=>handleSubmit(e)}>
            <label>
                <p>Name</p>
                <input type="text" name="name" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Description</p>
                <input type="text" name="description" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Powertool?</p>
                <input type="text" name="power_tool" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>HourlyPrice?</p>
                <input type="text" name="hourly_price" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Price</p>
                <input type="text" name="price" onChange={e=>handleChange(e)}/>
            </label>
            <label>
                <p>Pictures</p>
                <input type="file" name="pictures" onChange={e=>{setToolPicture(e.target.files[0]); console.log(toolPicture)}}/>
            </label>
            <label>
                <p>Location</p>
                <input type="text" name="location" onChange={e=>handleChange(e)}/>
            </label>
            <div>
                <button type="submit">Add Tool</button>
            </div>
        </form>
        
    </div>
  )
}
