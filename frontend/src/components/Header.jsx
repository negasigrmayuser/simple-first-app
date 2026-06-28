import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {FaSignInAlt, FaUserPlus} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux';
import { logout,reset } from '../features/auth/authSlice';
import '../stryles/header.css'


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
    

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <div className='header'>
     <div className='logo'>
         <Link to='/'>🎯 GoalSetter</Link>
      </div>
     <ul>
      {user ? (
  <>
    <li className="welcome-user">
      Welcome, {user.name}
    </li>

    <li>
      <button
        onClick={onLogout}
        className="btn-outline"
      >
        <FaSignInAlt />
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li>
      <Link to="/login">
        <FaSignInAlt />
        Login
      </Link>
    </li>

    <li>
      <Link to="/register">
        <FaUserPlus />
        Register
      </Link>
    </li>
  </>
)}
     </ul>
    </div>
  )
}

export default Header
