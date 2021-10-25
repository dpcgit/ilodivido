import { useMutation} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import { ADD_TOOL} from '../../graphql_const';
//import { Link } from 'react-router-dom';
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// https://www.apollographql.com/docs/react/data/mutations/
//https://www.apollographql.com/docs/react/get-started/
//https://medium.com/nerd-for-tech/how-to-build-forms-with-multiple-input-fields-using-react-hooks-677da2b851aa
// https://buddy.works/tutorials/how-to-connect-mongodb-to-graphql-server
// https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react
//https://medium.com/@enespalaz/file-upload-with-graphql-9a4927775ef7
//

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Input from '@mui/material/Input';


function uploadFile(file, url) {
    fetch(url, {
        method: 'PUT',
        body: file
    }).then(() => {
        console.log('File uploaded to bucket: ', file.name)
    }).catch((e) => {
        console.error(e);
    });
}

export default function AddTool({user_name}) {

  const [tool,setTool] = useState({ name:"",
                                    description:"",
                                    power_tool:'',
                                    hourly_price:'',
                                    price:'',
                                    pictures:[],
                                    location:''
    });
  const [toolPicture,setToolPicture] = useState();

  const [toolPictureURL,setToolPictureURL] = useState()
  useEffect(()=>{

    console.log('toolpicture object: ', toolPicture)

    async function retrieveNewURL(file,username) {
        try{
            console.log('File name to be:', file.name)
            const response = await fetch(`/presignedUrl?name=${file.name}&username=${username}`)
            console.log('Upload URL response: ', response)
            const url = await response.text();
            console.log('Upload URL: ', url)
            return url;
        }
        catch(error){
            console.log(error.message)
        }
    }

    (async () => {
        if (toolPicture !== undefined){
            const picture_url = await Promise.all(Array.from(toolPicture).map(
                async (tool_picture) =>
                {
                    return await retrieveNewURL(tool_picture, user_name)
                }
            )
            );
            console.log('Picture url: ', picture_url)
            setToolPictureURL(picture_url)
            console.log('effect: ',toolPicture)
        };
    })();

  },[toolPicture,user_name]);

  const [addTool, { data, loading, error }] = useMutation(ADD_TOOL);

  const theme = createTheme();

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  async function handleSubmit(event){
    event.preventDefault();
    console.log('File to be submited: ', toolPicture)
    //console.log('Picture url: ', toolPictureURL)
    //await uploadFile(toolPicture,toolPictureURL)
    toolPictureURL.map(async (url,url_index)=>{
        await uploadFile(toolPicture[url_index],url)
    })
    console.log('User to be modified: ',user_name)
    const new_tool = {...tool,['pictures']:Array.from(toolPicture).map(tool_picture=>tool_picture.name)}
    console.log('NEW TOOL', new_tool)
    await setTool(new_tool);
    await addTool({variables:{addToolInput:new_tool,addToolUsername:user_name/*,file:toolPicture*/}});
    console.log('tool added')
  };

  function handleChange(event){
    setTool({...tool,[event.target.name]:event.target.value});
    };

  return(

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Power tool?"
                  name="power_tool"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="hourly_price"
                  label="Hourly price?"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  multiple
                  type='file'
                  name="pictures"
                  label="Pictures"
                  inputProps={{ accept: 'image/png, image/gif, image/jpeg', multiple:true }}
                  onChange={e=>{setToolPicture(e.target.files); console.log('toolPicture: ',toolPicture)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={e=>handleSubmit(e)}
            >
              Add tool
            </Button>
          </Box>

      </Container>
    </ThemeProvider>
  )
}
