import React from "react";
import { Link,useNavigate } from "react-router-dom";
// import logo from "../photos/roman.jpg";


const Nav = ()=>{
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate("/signup");
  }
    return(
        <div>
          { auth  ? <ul className="nav-ul">
            <li><Link to="/">Product</Link></li>
            <li><Link to="/add"> Add Product</Link></li>
            <li><Link to="/update"> update Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/cart">Cart</Link></li>

            {/* <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).user.name})</Link></li> */}
            <li> <Link onClick={logout} to="/signup">logout({JSON.parse(localStorage.getItem('user')).name})</Link></li>

              </ul> 
              :
              <ul className="nav-ul nav-right">
                  <li><Link to="/signup">Signup</Link></li>  
                  <li><Link to="/signin">Signin</Link></li>  

              </ul>
           }
        </div>
    )
}

export default Nav;