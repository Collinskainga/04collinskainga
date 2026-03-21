const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 465,
      secure: process.env.EMAIL_SECURE
        ? process.env.EMAIL_SECURE === "true"
        : true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const fromAddress = process.env.EMAIL_USER || "collinskainga2004@gmail.com";
    const mailOptions = {
      from: fromAddress,
      replyTo: `${name} <${email}>`,
      to: "collinskainga2004@gmail.com",
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `<p><strong>Name</strong>: ${name}</p><p><strong>Email</strong>: ${email}</p><p><strong>Message</strong>:<br/>${message.replace(/\n/g, "<br/>")}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Send email failed:", error);
    res.status(500).json({ error: "Unable to send email at this time." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
