const sendToken = (user, status, res) => {
  const token = user.sendJWTToken();

  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(status).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
