//https://www.debuggr.io/react-update-unmounted-component/
//https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Preferences from '../Preferences/Preferences';
import AddTool from '../AddTool/AddTool'
import SearchTool from '../SearchTool/SearchTool'
import { setLoggedIn, setLocation } from '../App/AppSlice';
import MyTools from '../MyTools/MyTools'
//import ConnectToWalletButton from '../ConnectToWalletButton/ConnectToWalletButton'

import { useQuery} from '@apollo/client';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



function PrivateWrapper() {
  //const [location, setLocation] = useState();
  const dispatch = useDispatch()
  const location = useSelector((state)=>state.app.location)
  const loggedIn = useSelector((state)=>state.app.logged_in)
  const username = useSelector((state)=>state.app.username)

  const theme = createTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        dispatch(setLocation({location:[pos.coords.latitude,pos.coords.longitude]}))
        //console.log('location in state: ',location)
      })
    }
    else{
      dispatch(setLocation({location:['']}))
    }

  },[location])

  if(!loggedIn){
    return <Redirect to ="/login"/>
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem component={Link} to="/preferences">Preferences</MenuItem>
                <MenuItem onClick={()=>{dispatch(setLoggedIn({logged_in:false}));localStorage.setItem('loggedIn',JSON.stringify(false))}}>Logout</MenuItem>
              </Menu>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ilodivido
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path='/preferences'>
              <Preferences/>
            </Route>
            <Route path='/add-tool'>
              <AddTool user_name={username}/>
            </Route>
            <Route path='/search-tool*'>
              <SearchTool user_name={username}/>
            </Route>
            <Route path='/my-tools'>
              <MyTools/>
            </Route>
          </Switch>
        </Box>
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction label="My Tools" icon={<RestoreIcon />} component={Link} to="/my-tools"/>
            <BottomNavigationAction label="Search tools" icon={<FavoriteIcon />} component={Link} to="/search-tool"/>
            <BottomNavigationAction label="Search location" icon={<LocationOnIcon />} component={Link} to="/search-tool"/>
          </BottomNavigation>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
    );
}


export default PrivateWrapper;
