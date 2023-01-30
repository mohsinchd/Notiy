const nodemailer = require("nodemailer");

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohsinshoaib735@gmail.com",
      pass: "oedjaddntiadlgva",
    },
  });

  const mailOptions = {
    from: "mohsinshoaib735@gmail.com",
    to: data.email,
    subject: data.subject,
    text: data.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
