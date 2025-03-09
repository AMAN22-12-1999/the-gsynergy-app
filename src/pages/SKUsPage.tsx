import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addSKU, removeSKU } from '../features/skus/skusSlice'

const SKUsPage: React.FC = () => {
  const skus = useAppSelector((state) => state.skus)
  const dispatch = useAppDispatch()
  const [newSKU, setNewSKU] = useState({ name: '', price: 0, cost: 0 })

  const handleAddSKU = () => {
    if (newSKU.name.trim() !== '') {
      dispatch(addSKU(newSKU))
      setNewSKU({ name: '', price: 0, cost: 0 })
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">SKUs</h1>

      {/* Add SKU Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="SKU Name"
            value={newSKU.name}
            onChange={(e) => setNewSKU({...newSKU, name: e.target.value})}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newSKU.price || ''}
            onChange={(e) => setNewSKU({...newSKU, price: Number(e.target.value)})}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Cost"
            value={newSKU.cost || ''}
            onChange={(e) => setNewSKU({...newSKU, cost: Number(e.target.value)})}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddSKU}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add SKU
          </button>
        </div>
      </div>

      {/* SKUs Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">SKU</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Cost</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {skus.map((sku) => (
              <tr key={sku.id}>
                <td className="px-6 py-4 whitespace-nowrap">{sku.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${sku.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">${sku.cost.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => dispatch(removeSKU(sku.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SKUsPage