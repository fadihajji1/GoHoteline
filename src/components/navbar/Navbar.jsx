import { useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
  const {user}=useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        {/* "link"  as same as "href" : click on logo WiLL head to home page*/}
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}> 
          <span className="logo">GoHoteline</span>
        </Link>
        {user? user.username : ( 
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar