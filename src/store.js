import { configureStore } from '@reduxjs/toolkit'
import appReducer from './components/App/AppSlice'

export default configureStore({
  reducer: {
      app:appReducer,
  },
})