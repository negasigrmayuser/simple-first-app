import React from 'react'
import { useState } from 'react'
import { FaUser} from 'react-icons/fa'
function Register() {
     const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
     })

     const {name, email, password, password2} = formData

     const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            alert("password do not match")
            return
        }
    }

    const onchange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

  return (
    <>
    <section>
     <h1><FaUser /> Register</h1>
     <p>please create an account</p>
    </section>

    <section>
     <form onSubmit={onSubmit}>
    <div className='form-group'>
        <input type='text' placeholder='Enter your name' className='form-control' required id='name' value={name} onChange={onchange} />
    </div>
    <div className='form-group'>
        <input type='email' placeholder='Enter your email' className='form-control' required id='email' value={email} onChange={onchange} />
    </div>

    <div className='form-group'>
        <input type='password' placeholder='Enter your password' className='form-control' required id='password' value={password} onChange={onchange} />
    </div>

    <div className='form-group'>
        <input type='password' placeholder='Confirm your password' className='form-control' required id='password2' value={password2} onChange={onchange} />
    </div>

    <div className='form-group'>
        <button type='submit' className='btn btn-block'>
          Register
        </button>
    </div>
     </form>
    </section>
    </>
  )
}

export default Register