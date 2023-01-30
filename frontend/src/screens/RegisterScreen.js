import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../actions/userActions";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { REGISTER_USER_RESET } from "../constants/userConstants";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerUser);
  const { loading, user, error } = registerUser;
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userRegister({ email, password, name }));
  };

  useEffect(() => {
    if (user) {
      toast.success("Sign In Successfully");
      navigate("/notes");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: REGISTER_USER_RESET });
    }
  }, [user, navigate, error]);

  return (
    <div className="mine-container mt-5">
      {loading && <Spinner />}
      <form className="form" onSubmit={submitHandler}>
        <h4>Sign up</h4>

        <div className="div">
          <input
            type="text"
            className="input"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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
          <button className="btn-mine">Create New Account</button>
          <Link to="/" className="lead text-dark text-center">
            Already Have an account? Sign In Instead
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
