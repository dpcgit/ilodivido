import { useMutation} from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setRegistered } from '../App/AppSlice'
import React, {useState} from 'react';
import { ADD_USER} from '../../graphql_const';
import { Link } from 'react-router-dom';
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// https://www.apollographql.com/docs/react/data/mutations/
//https://www.apollographql.com/docs/react/get-started/
//https://medium.com/nerd-for-tech/how-to-build-forms-with-multiple-input-fields-using-react-hooks-677da2b851aa
// https://buddy.works/tutorials/how-to-connect-mongodb-to-graphql-server
//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js

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


export default function Register() {
  const [user,setUser] = useState({username:"",email:"",password:"", location:''});
  const dispatch = useDispatch();
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const theme = createTheme();
  
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  async function handleSubmit(event){
    event.preventDefault();
    addUser({variables:{addUserInput:user}})
    dispatch(setRegistered({registered:true}));
    console.log('user registered')
  };

  function handleChange(event){
    setUser({...user,[event.target.name]:event.target.value});
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="firstName"
                  label="User name"
                  autoFocus
                  onChange={e=>handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e=>handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e=>handleChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/login'>
                    <Button>Login</Button>
                  </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
