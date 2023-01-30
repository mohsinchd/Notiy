import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordForgot } from "../actions/forgotPasswordActions";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { FORGOT_PASSWORD_RESET } from "../constants/forgotPasswordConstants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { loading, error, message } = forgotPassword;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordForgot({ email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: FORGOT_PASSWORD_RESET });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [error, message, dispatch]);

  return (
    <div className="mine-container mt-5">
      {loading && <Spinner />}
      <form className="form" onSubmit={submitHandler}>
        <h4>Forgot Password</h4>

        <div className="div">
          <input
            type="email"
            className="input"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <button className="btn-mine">Send Reset Link</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
