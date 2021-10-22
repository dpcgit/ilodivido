//https://dgraph.io/blog/post/designing-graphql-schemas/
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUser,setLoggedIn } from '../App/AppSlice'
import { useQuery} from '@apollo/client';
import { GET_USER_CREDENTIALS} from '../../graphql_const';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Login() {

  const theme = createTheme();

  const [user_info,setUserinfo] = useState({username:"",password:""});
  const dispatch = useDispatch();
  const {data, loading, error} = useQuery(GET_USER_CREDENTIALS,{variables:{username:user_info.username}});

  function handleChange(event){
    setUserinfo({...user_info,[event.target.name]:event.target.value});
  };

  async function handleSubmit(event){
    event.preventDefault();
   try {

    if(data.user.username === user_info.username && data.user.password === user_info.password){
      dispatch(setUser({username:data.user.username}))
      dispatch(setLoggedIn({logged_in:true}))
      localStorage.setItem('loggedIn',JSON.stringify(true))
      console.log('logged in')
    }
    else{
      dispatch(setLoggedIn({logged_in:false}))
      console.log('error validating credentials')
    }
   }
   catch(error){
     console.log(error);
    console.log('something went wrong')
   }
  };

  return(
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
              onChange={e=>handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>handleChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/register'>
                  <Button>Register</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
