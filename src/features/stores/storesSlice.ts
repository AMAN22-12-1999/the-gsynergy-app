import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface Store {
  id: string
  name: string
  city: string
  state: string
}

const initialState: Store[] = [
  { 
    id: uuidv4(), 
    name: 'Atlanta Outfitters',
    city: 'Atlanta',
    state: 'GA'
  },
  // Add other mock stores from the screenshot
]

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<{name: string, city: string, state: string}>) => {
      state.push({ 
        id: uuidv4(),
        ...action.payload 
      })
    },
    removeStore: (state, action: PayloadAction<string>) => {
      return state.filter(store => store.id !== action.payload)
    },
  }
})

export const { addStore, removeStore } = storesSlice.actions
export default storesSlice.reducer