import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {
    const navigate = useNavigate();
    return(
        <div className="navbar">
        <div className="logos">Organic Farm </div>
            <ul>
                <NavLink to="/">
                    <li>Home</li>
                </NavLink>
                <NavLink to="/products">
                    <li>Products</li>
                </NavLink>
                <NavLink to="/about">
                    <li>About</li>
                </NavLink>
                <NavLink to="/contact">
                    <li>Contact</li>
                </NavLink>
                <NavLink to="/users">
                    <li>Users</li>
                </NavLink>
            </ul>
            <button onClick={() => navigate("/login", { replace: true })}>Login /Register</button>

        </div>
    );
};

export default Navbar;