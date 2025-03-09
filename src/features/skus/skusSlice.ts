import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

interface SKU {
  id: string
  name: string
  price: number
  cost: number
}

const initialState: SKU[] = [
  { id: uuidv4(), name: 'SKU 1', price: 10, cost: 6 },
  { id: uuidv4(), name: 'SKU 2', price: 20, cost: 12 },
]

const skusSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<{ name: string, price: number, cost: number }>) => {
      state.push({ id: uuidv4(), ...action.payload })
    },
    removeSKU: (state, action: PayloadAction<string>) => {
      return state.filter(sku => sku.id !== action.payload)
    },
    // updateSKU can be added if update functionality is needed.
  }
})

export const { addSKU, removeSKU } = skusSlice.actions
export default skusSlice.reducer
