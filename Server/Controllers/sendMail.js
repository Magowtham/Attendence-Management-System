const nodeMailer = require("nodemailer");

//creating a transporter object using SMTP transport

const sendEmail = async (email, otp, res) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "gowthamma9483@gmail.com",
        pass: "agolskfuiywiyqgu",
      },
    });
    const details = {
      from: "gowthamma9483@gmail.com",
      to: email,
      subject: "Testing",
      text: `hey your otp is ---- ${otp} !!`,
    };
    const emailResult = await transporter.sendMail(details);
    return { status: true, emailResult };
  } catch (err) {
    return { status: false, err };
  }
};

module.exports = sendEmail;
