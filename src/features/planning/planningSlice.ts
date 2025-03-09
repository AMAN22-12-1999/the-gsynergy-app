// features/planning/planningSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WeekData {
  salesUnits: number
}

interface PlanningData {
  storeId: string
  skuId: string
  weeks: { [key: string]: WeekData }
}

interface PlanningState {
  data: PlanningData[]
  calendar: {
    months: {
      name: string
      weeks: string[]
    }[]
  }
}

const initialState: PlanningState = {
  data: [],
  calendar: {
    months: [
      {
        name: 'October 2023',
        weeks: ['2023-10-01', '2023-10-08', '2023-10-15', '2023-10-22', '2023-10-29']
      },
      {
        name: 'November 2023',
        weeks: ['2023-11-05', '2023-11-12', '2023-11-19', '2023-11-26']
      }
    ]
  }
}

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<{
      storeId: string
      skuId: string
      week: string
      value: number
    }>) => {
      const { storeId, skuId, week, value } = action.payload
      const record = state.data.find(
        d => d.storeId === storeId && d.skuId === skuId
      )
      
      if (record) {
        record.weeks[week].salesUnits = value
      } else {
        state.data.push({
          storeId,
          skuId,
          weeks: {
            [week]: { salesUnits: value }
          }
        })
      }
    }
  }
})

export const { updateSalesUnits } = planningSlice.actions
export default planningSlice.reducer