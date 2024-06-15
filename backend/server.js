const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port_no = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Configure the SMTP transporter with Bravo
const transporter = nodemailer.createTransport({
  host: process.env.BRAVO_SMTP_HOST,
  port: process.env.BRAVO_SMTP_PORT,
  secure: false, // or true if using SSL
  auth: {
    user: process.env.BRAVO_SMTP_USER,
    pass: process.env.BRAVO_SMTP_PASS,
  },
});

// Async function to send emails
const sendEmails = async (ownerMailOptions, userMailOptions) => {
  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    console.log(address)
    throw error; // Propagate the error to be caught in the API endpoint
  }
};

app.get('/', (req,res)=>{
  res.send("server is started");
});
// POST endpoint to handle contact form submissions

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_OWNER,
    subject: `New Message from ${name}`,
    html: `
    <h2>New Message Received</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
  };

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'I’ve Got Your Message!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hi there!</h2>
        <p>Thanks for reaching out. I’ve received your message and will get back to you soon.</p>
        <p style="font-size: smaller; color: #888;">Please don’t reply to this message as it’s system generated.</p>
        <p>Have a great day!</p>
      </div>
    `,
  };
  
  try {
    await sendEmails(ownerMailOptions, userMailOptions);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(port_no, () => {
  console.log(process.env.BRAVO_SMTP_HOST)
  console.log(`Server is running on port ${port_no}`);
});
