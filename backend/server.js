import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const app = express();
const port_no = process.env.PORT || 3000;

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

app.use(express.static('../dist'));
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


app.get('/api/blogs', async (req, res) => {
  const { limit } = req.query; 
  const query = `
    query {
      user(username: "${process.env.HASHNODE_USERNAME}") {
        publications(first: ${limit || 50}) {
          edges {
            node {
              posts(first: ${limit || 50}) { 
                edges {
                  node {
                    title
                    brief
                    slug
                    coverImage {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post('https://gql.hashnode.com/', { query }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const posts = response.data.data.user.publications.edges.map(edge => edge.node.posts.edges.map(postEdge => postEdge.node));
    res.json(posts.flat());
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

const host = process.env.HASHNODE_HOST;
app.get('/api/blogs/:slug', async (req, res) => {
  const { slug } = req.params;
  const query = `
    query SinglePublicationPost($host: String, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          content {
            markdown
          }
          coverImage {
            url
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post('https://gql.hashnode.com/', {
      query,
      variables: { host, slug }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const postData = response.data.data.publication.post;
    res.json(postData);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// Start the server
app.listen(port_no, () => {
  console.log(`Server is running on port ${port_no}`);
});
