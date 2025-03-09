import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { ColDef, ColGroupDef } from 'ag-grid-community'
import { updateSalesUnits } from '../features/planning/planningSlice'
import { ClientSideRowModelModule } from 'ag-grid-community'

// Helper functions defined at the top
const formatWeek = (weekIndex: number) => {
  return `Week ${weekIndex + 1}`
}

const getGmStyle = (value: number) => {
  if (value >= 40) return { backgroundColor: '#4CAF50', color: 'white' }
  if (value >= 10) return { backgroundColor: '#FFEB3B' }
  if (value > 5) return { backgroundColor: '#FF9800' }
  return { backgroundColor: '#F44336', color: 'white' }
}

const PlanningPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data: planningData, calendar } = useAppSelector((state) => state.planning)
  const stores = useAppSelector((state) => state.stores)
  const skus = useAppSelector((state) => state.skus)

  const rowData = useMemo(() => {
    return stores.flatMap(store => 
      skus.map(sku => {
        const weekData = planningData.find(
          d => d.storeId === store.id && d.skuId === sku.id
        )?.weeks || {}
        
        return {
          id: `${store.id}-${sku.id}`,
          store: store.name,
          sku: sku.name,
          price: sku.price,
          cost: sku.cost,
          ...Object.keys(weekData).reduce((acc, week) => {
            acc[week] = weekData[week].salesUnits
            return acc
          }, {} as Record<string, number>)
        }
      })
    )
  }, [stores, skus, planningData])

  const columnDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
    const baseColumns: (ColDef | ColGroupDef)[] = [
      { 
        headerName: 'Store',
        field: 'store',
        pinned: 'left',
        width: 200,
        cellStyle: { fontWeight: '600' }
      },
      { 
        headerName: 'SKU',
        field: 'sku',
        pinned: 'left',
        width: 250,
      }
    ]

    calendar.months.forEach(month => {
      const monthGroup: ColGroupDef = {
        headerName: month.name,
        marryChildren: true,
        children: month.weeks.map((week, weekIndex) => ({
          headerName: formatWeek(weekIndex), // Now shows "Week 1", "Week 2" etc.
          children: [
            {
              headerName: 'Sales Units',
              field: week,
              editable: true,
              width: 120,
              cellStyle: { backgroundColor: '#f0f9ff' },
              cellRenderer: (params: any) => params.value ?? 0,
              valueParser: (params: any) => Number(params.newValue),
              cellClassRules: {
                'cell-changed': (params: any) => params.newValue !== params.oldValue
              },
            },
            {
              headerName: 'Sales $',
              valueGetter: (params: any) => (params.data[week] || 0) * params.data.price,
              valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
              width: 130
            },
            {
              headerName: 'GM $',
              valueGetter: (params: any) => {
                const units = params.data[week] || 0
                return (units * params.data.price) - (units * params.data.cost)
              },
              valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
              width: 130
            },
            {
              headerName: 'GM %',
              valueGetter: (params: any) => {
                const sales = (params.data[week] || 0) * params.data.price
                const gm = sales - ((params.data[week] || 0) * params.data.cost)
                return sales ? (gm / sales) * 100 : 0
              },
              valueFormatter: (params: any) => `${params.value.toFixed(1)}%`,
              cellStyle: (params: any) => getGmStyle(params.value),
              width: 100
            }
          ]
        }))
      }
      baseColumns.push(monthGroup)
    })

    return baseColumns
  }, [calendar])

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    suppressMovable: true
  }), [])

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Planning Grid</h1>
      <div 
        className="ag-theme-alpine flex-1" 
        style={{ minHeight: '600px', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          modules={[ClientSideRowModelModule]}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          groupHeaderHeight={40}
          headerHeight={40}
          rowHeight={35}
          onCellValueChanged={(params) => {
            if (params.colDef.field) {
              const [storeId, skuId] = params.data.id.split('-')
              dispatch(updateSalesUnits({
                storeId,
                skuId,
                week: params.colDef.field,
                value: params.newValue
              }))
            }
          }}
          suppressRowClickSelection
          enableRangeSelection
          animateRows
        />
      </div>
    </div>
  )
}

export default PlanningPage