import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    username: '',
    logged_in: false,
    registered: false,
    location:[''],
    tool_list:[],
    selected_tool:undefined,
    cart:[],
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
    },
    setToolList: (state,action) =>{
      state.tool_list = action.payload.tool_list
    },
    setSelectedTool: (state,action) => {
      state.selected_tool = action.payload.selected_tool
    },
    addToCart:(state,action) => {
      console.log('Action',action)
      state.cart.push(action.payload.tool)
    },
    removeFromCart:(state,action) =>{
      state.cart = state.cart.filter((tool)=>tool.name !== action.payload.tool.name)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser,setLoggedIn,setRegistered, setLocation, setToolList, setSelectedTool,addToCart,removeFromCart } = appSlice.actions

export default appSlice.reducer
