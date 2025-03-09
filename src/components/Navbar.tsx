import React from 'react'
import logo from '../assets/logo.svg'
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('currentUser');
    navigate('/login');
  };
  return (
    <nav className="bg-white-600 p-4 flex justify-between items-center relative">
      {/* Left-aligned Logo */}
      <div className="flex items-center">
        <img src={logo} alt="GSynergy Logo" className="h-8 w-20 mr-2" />
      </div>

      {/* Centered App Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="font-bold text-lg text-black">Data Viewer App</span>
      </div>

      {/* Right-aligned Sign In button */}
      <div>
        <button  onClick={handleLogout} className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-white">
          Log Out
        </button>
      </div>
    </nav>
  )
}
export default Navbar
