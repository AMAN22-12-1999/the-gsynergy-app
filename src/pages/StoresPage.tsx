import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addStore, removeStore } from '../features/stores/storesSlice'

const StoresPage: React.FC = () => {
  const stores = useAppSelector((state) => state.stores)
  const dispatch = useAppDispatch()
  const [newStore, setNewStore] = useState({ name: '', city: '', state: '' })

  const handleAddStore = () => {
    if (newStore.name.trim() !== '') {
      dispatch(addStore(newStore))
      setNewStore({ name: '', city: '', state: '' })
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Stores</h1>
      
      {/* Add Store Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({...newStore, name: e.target.value})}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={newStore.city}
            onChange={(e) => setNewStore({...newStore, city: e.target.value})}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={newStore.state}
            onChange={(e) => setNewStore({...newStore, state: e.target.value})}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddStore}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Store
          </button>
        </div>
      </div>

      {/* Stores Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">S.No</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Store</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">City</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">State</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stores.map((store, index) => (
              <tr key={store.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{store.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => dispatch(removeStore(store.id))}
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

export default StoresPage