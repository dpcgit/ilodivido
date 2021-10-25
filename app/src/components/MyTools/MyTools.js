//https://reactrouter.com/web/example/modal-gallery

import React, {useState} from 'react';
import { Route, Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setToolList,setSelectedTool } from '../App/AppSlice'
import { useQuery, NetworkStatus} from '@apollo/client';
import { GET_TOOLS_BY_NAME, GET_TOOLS_BY_USER} from '../../graphql_const';
import Tool from '../Tool/Tool'


import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import CircularProgress from '@mui/material/CircularProgress';

import ImageListItemBar from '@mui/material/ImageListItemBar';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Container from '@mui/material/Container';

export default function MyTools() {

    const dispatch = useDispatch();
    const user_name = useSelector((state)=>state.app.username);
    const toolList = useSelector((state)=>state.app.tool_list)
    const {loading, error, data, networkStatus} = useQuery(GET_TOOLS_BY_USER,{variables:{toolsByUserUser:user_name}, fetchPolicy: 'network-only'});

    const theme = createTheme();

    function handleClick(tool){
       dispatch(setSelectedTool({selected_tool:tool}))
    }

    if (loading) {
      console.log('Loading tools')
      return <CircularProgress/>
    }
    if (error) {
      console.log(error.message)
      return `Error! ${error.message}`
    }

    if(data){
      console.log('Tools received!:', data)
      console.log('Network status: ',networkStatus)
      dispatch(setToolList({tool_list:data.tools_by_user}))
      return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Route path="/my-tools/:username/:tool" children={<Tool/>}>
            </Route>
            <Route exact path="/my-tools">
            <ImageList sx={{ width: 1000, height: 450 }} cols={3} rowHeight={164} gap={10}>
              {toolList.map((tool) => (
                <ImageListItem key={`${user_name}-${tool.name}`} component={Link} to={`/search-tool/${user_name}/${tool.name}`} onClick={()=>handleClick(tool)}>
                  <img
                    src={tool.pictures[0]}
                    alt={tool.name}
                    srcSet={tool.pictures[0]}
                  />
                  <ImageListItemBar title={tool.name}/>
                </ImageListItem>
              ))}
            </ImageList>
            </Route>
            <Fab color="secondary" aria-label="add" component={Link} to='/add-tool'>
              <AddIcon />
            </Fab>
          </Container>
        </ThemeProvider>
      );
    }
}
