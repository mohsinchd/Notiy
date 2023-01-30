import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/userActions";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { LOGIN_USER_RESET } from "../constants/userConstants";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const { loading, user, error } = loginUser;
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (user) {
      toast.success("Logged In Successfully");
      navigate("/notes");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: LOGIN_USER_RESET });
    }
  }, [user, navigate, error]);

  return (
    <div className="mine-container mt-5">
      {loading && <Spinner />}
      <form className="form" onSubmit={submitHandler}>
        <h4>Log in</h4>
        <div className="div">
          <input
            type="email"
            className="input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-mine"> Log in </button>
          <Link to="/sign-up" className="lead text-dark text-center">
            Don't Have Account? Sign Up instead
          </Link>
          <Link to="/forgot-password" className="lead text-dark text-center">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
