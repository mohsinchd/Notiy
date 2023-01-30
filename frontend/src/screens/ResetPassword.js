import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordReset } from "../actions/forgotPasswordActions";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET_PASSWORD_RESET } from "../constants/forgotPasswordConstants";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const resetPassword = useSelector((state) => state.resetPassword);
  const { loading, error, user } = resetPassword;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordReset(token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: RESET_PASSWORD_RESET });
    }

    if (user) {
      toast.success("Password Reset Successfull");
      dispatch({ type: RESET_PASSWORD_RESET });
      navigate("/notes");
    }
  }, [error, user, dispatch, navigate]);

  return (
    <div className="mine-container mt-5">
      {loading && <Spinner />}
      <form className="form" onSubmit={submitHandler}>
        <h4>Reset Password</h4>

        <div className="div">
          <input
            type="password"
            className="input"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button className="btn-mine">Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
