import React from "react";

const Message = ({ type, children }) => {
  return (
    <div
      className={`alert ${type ? `alert-${type}` : `alert-danger`}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Message;
