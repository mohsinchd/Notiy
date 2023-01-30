import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const loginUser = useSelector((state) => state.loginUser);
  const { user } = loginUser;

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user, checkingStatus]);

  return { isLoggedIn, checkingStatus };
};

export default useAuth;
