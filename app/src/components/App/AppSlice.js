import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    username: '',
    logged_in: false,
    registered: false,
    location:['']
  },
  reducers: {
    setUser: (state,action) => {
      state.username = action.payload.username 
    },
    setLoggedIn: (state,action) => {
      state.logged_in = action.payload.logged_in
    },
    setRegistered: (state,action) => {
      state.registered = action.payload.registered
    },
    setLocation: (state,action) => {
      state.location = action.payload.location
    }

  },
})

// Action creators are generated for each case reducer function
export const { setUser,setLoggedIn,setRegistered, setLocation } = appSlice.actions

export default appSlice.reducer