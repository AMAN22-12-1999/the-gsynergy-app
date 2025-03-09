import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface ChartData {
  week: string
  salesDollars: number
  gmDollars: number
  gmPercentage: number
}

const ChartPage: React.FC = () => {
  // In a real application, this data would be computed from the grid data.
  const chartData: ChartData[] = [
    { week: 'Week 1', salesDollars: 1000, gmDollars: 400, gmPercentage: 40 },
    { week: 'Week 2', salesDollars: 1500, gmDollars: 450, gmPercentage: 30 },
    { week: 'Week 3', salesDollars: 1200, gmDollars: 600, gmPercentage: 50 },
    { week: 'Week 4', salesDollars: 2000, gmDollars: 800, gmPercentage: 40 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="gmDollars" fill="#82ca9d" name="GM Dollars" />
          <Bar yAxisId="right" dataKey="gmPercentage" fill="#8884d8" name="GM %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartPage
