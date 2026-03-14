import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()  // useNavigate is a hook that returns a function that can be used to navigate to a new route

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value })); // e.target.id is the id of the input field
  };

  const handleClick = async (e) => {
    e.preventDefault(); // prevent the page from reloading/refresh
    dispatch({ type: "LOGIN_START" });
   
    try {
      const res = await axios.post("/auth/login", credentials);
      
      if(res.data.isAdmin) {  // check if the user is admin before login in to admin panel
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details});
      }else{
        dispatch({ 
          type: "LOGIN_FAILURE",
          payload: {message: "Oops you are not admin!!"}
        });
      }
   
      navigate("/") // navigate to the home page after login in successfully
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
