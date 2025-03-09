import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';

const Sidebar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <aside className="bg-gray-100 w-64 min-h-screen p-4">
      <nav className="space-y-2">
        <NavLink
          to="/stores"
          className={({ isActive }) =>
            isActive ? 'bg-gray-300 block p-2 rounded' : 'block p-2 rounded hover:bg-gray-200'
          }
        >
          Stores
        </NavLink>
        <NavLink
          to="/skus"
          className={({ isActive }) =>
            isActive ? 'bg-gray-300 block p-2 rounded' : 'block p-2 rounded hover:bg-gray-200'
          }
        >
          SKUs
        </NavLink>
        <NavLink
          to="/planning"
          className={({ isActive }) =>
            isActive ? 'bg-gray-300 block p-2 rounded' : 'block p-2 rounded hover:bg-gray-200'
          }
        >
          Planning
        </NavLink>
        {user?.role === 'superadmin' &&
          <NavLink
            to="/chart"
            className={({ isActive }) =>
              isActive ? 'bg-gray-300 block p-2 rounded' : 'block p-2 rounded hover:bg-gray-200'
            }
          >
            Chart
          </NavLink>
        }

      </nav>
    </aside>
  )
}
export default Sidebar
