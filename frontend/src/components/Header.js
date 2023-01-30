import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../actions/userActions";
import { toast } from "react-toastify";
import { LOGIN_USER_RESET } from "../constants/userConstants";

const Header = () => {
  const loginUser = useSelector((state) => state.loginUser);
  const { user } = loginUser;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch({ type: LOGIN_USER_RESET });
    navigate("/");
    toast.success("Logged Out successfully");
  };

  return (
    <nav className="navbar bg-secondary navbar-dark p-4">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <Link to="/" className="navbar-brand mb-0 h1">
            Notiy
          </Link>
        </span>
        <ul className="navbar-nav ms-auto flex-row">
          {user && (
            <li className="nav-item me-4">
              <Link className="btn btn-primary" to="/note-detail">
                View Your Notes
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <button className="btn btn-primary" onClick={logoutHandler}>
                Logout User
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
