import React, { useEffect,useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import {Link,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import '../stryles/Register.css'
function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)

 useEffect(() => {
  if (isError) {
    toast.error(message);
  }

  if (isSuccess || user) {
    toast.success("Registration successful!");
    navigate("/");
  }

  return () => {
    dispatch(reset());
  };
}, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      
    }
    else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))  
    }
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <section className="heading">
          <h1>
            <FaUserPlus />
            Create Account
          </h1>

          <p>
            Start tracking your goals and achieve more every day.
          </p>
        </section>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={name}
              required
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              value={password}
              onChange={onChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn-register">
            Create Account
          </button>
          <div className="auth-footer">
         Already have an account? <Link to="/login">Login</Link>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Register;