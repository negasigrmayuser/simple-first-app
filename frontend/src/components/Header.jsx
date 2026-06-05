import React from 'react'
import { Link } from 'react-router-dom'
import {FaSignInAlt, FaUserPlus} from 'react-icons/fa'

function Header() {
  return (
    <div className='header'>
     <div className='logo'>
      <Link to='/'>GoslSetter</Link>
     </div>
     <ul>
        <li><Link to='/login'><FaSignInAlt /> Login</Link></li>
        <li><Link to='/register'><FaUserPlus /> Register</Link></li>
     </ul>
    </div>
  )
}

export default Header
