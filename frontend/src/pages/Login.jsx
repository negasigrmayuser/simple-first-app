import React from 'react'
import { useState } from 'react'
import { FaSignInAlt} from 'react-icons/fa'
function Login() {
     const [formData, setFormData] = useState({
        email: '',
        password: '',
       
     })

     const { email, password} = formData

     const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            alert("password or email do not match")
            return
        }
    }

    const onchange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

  return (
    <>
    <section>
     <h1><FaSignInAlt /> Login</h1>
     <p>please login to your account</p>
    </section>

    <section>
     <form onSubmit={onSubmit}>
    <div className='form-group'>
        <input type='email' placeholder='Enter your email' className='form-control' required id='email' value={email} onChange={onchange} />
    </div>

    <div className='form-group'>
        <input type='password' placeholder='Enter your password' className='form-control' required id='password' value={password} onChange={onchange} />
    </div>

    <div className='form-group'>
        <button type='submit' className='btn btn-block'>
          Login
        </button>
    </div>
     </form>
    </section>
    </>
  )
}

export default Login
