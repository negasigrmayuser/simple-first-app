import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import '../stryles/login.css'

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)
  
    React.useEffect(() => {
      
    if (isSuccess || user) {
      toast.success("Login successful!");
      navigate('/');
    }
  
      if (isError) {
        toast.error(message);
      }
  
       dispatch(reset())
    }, [isSuccess, isError, message, navigate, dispatch]);

    if(isLoading){
      return <Spinner />
    }
 
const onSubmit = (e) => {
  e.preventDefault();

  const userData = {
    email,
    password,
  };

  dispatch(login(userData));
};

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>

        <p>Welcome back! Login to continue.</p>
      </section>

      <section>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              required
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              required
              id="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn">
              Login
            </button>
            <div className="auth-link">
             Don't have an account? <Link to="/register">Register</Link>
          </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;