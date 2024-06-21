# Personal Portfolio Website

This project is a personal portfolio website that showcases various projects and allows users to contact the owner via a contact form. It integrates with Bravo SMTP for email sending and fetches blog posts from Hashnode using their API. The frontend is built with React and Vite, and the backend is built with Node.js.

## Overview

- **Contact Form:** Users can send messages to the owner.
- **Bravo SMTP:** Handles email sending.
- **Hashnode API:** Fetches blog posts.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**  
   `git clone https://github.com/Bhaveshj008/BhaveshJadhavPortfolio`

2. **Install dependencies:**  
   `npm install`

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and define the following variables:  
   - `BRAVO_SMTP_HOST=<your_bravo_smtp_host>`
   - `BRAVO_SMTP_PORT=<your_bravo_smtp_port>`
   - `BRAVO_SMTP_USER=<your_bravo_smtp_user>`
   - `BRAVO_SMTP_PASS=<your_bravo_smtp_password>`
   - `EMAIL_USER=<your_email_address>`
   - `EMAIL_OWNER=<owner_email_address>`
   - `HASHNODE_USERNAME=<your_hashnode_username>`
   - `HASHNODE_HOST=<your_hashnode_host>`
   - `PORT=<optional_port_number>`

4. **Start the server:**  
   `npm run dev`  
   This will start the server on the specified port or default to port 3000.

## Configuration

### Environment Variables

- `BRAVO_SMTP_HOST`: Hostname for Bravo SMTP.
- `BRAVO_SMTP_PORT`: Port for Bravo SMTP.
- `BRAVO_SMTP_USER`: User for Bravo SMTP authentication.
- `BRAVO_SMTP_PASS`: Password for Bravo SMTP authentication.
- `EMAIL_USER`: Sender's email address.
- `EMAIL_OWNER`: Owner's email address for receiving contact form submissions.
- `HASHNODE_USERNAME`: Hashnode username for fetching blog posts.
- `HASHNODE_HOST`: Host for Hashnode API.
- `PORT`: Optional port number for running the server (default is 3000).

## Endpoints and API

### /api/contact (POST)

- **Description:** Endpoint for handling contact form submissions.
- **Request Payload:** `{ name, email, subject, message }`
- **Response:** Success (200 OK) or Error (500 Internal Server Error).

### /api/blogs (GET)

- **Description:** Endpoint to fetch blog posts from Hashnode.
- **Query Parameters:** `limit` (optional)
- **Response:** Array of blog posts with fields like title, brief, slug, coverImage.

### /api/blogs/:slug (GET)

- **Description:** Endpoint to fetch a single blog post from Hashnode based on slug.
- **Path Parameter:** `slug` (unique identifier for the blog post)
- **Response:** Object containing blog post details including title, content, coverImage.

### /api/projects (GET)

- **Description:** Endpoint to fetch all projects stored in `projects.json`.
- **Response:** Array of project objects with fields like id, slug, name, images, video, description, category, sourceCode, livePreview.

### /api/projects/:id (GET)

- **Description:** Endpoint to fetch a specific project by ID from `projects.json`.
- **Path Parameter:** `id` (unique identifier for the project)
- **Response:** Object containing project details including id, slug, name, images, video, description, category, sourceCode, livePreview.

## Frontend Components

### About Component

- **Description:** Provides information about the owner of the portfolio.
- **Features:** Displays details such as background, interests, and contact information.

### AllBlogs Component

- **Description:** Displays a list of all blog posts fetched from Hashnode.
- **Features:** Shows blog title, brief, cover image, and links to the full post.

### BlogPost Component

- **Description:** Displays the content of a single blog post fetched from Hashnode.
- **Features:** Renders the full blog post including title, content, and cover image.

### Hero Component

- **Description:** The main landing section of the portfolio website.
- **Features:** Displays a welcome message, a brief introduction, and navigation links.

### Portfolio Component

- **Description:** Displays a collection of projects.
- **Features:** Shows project details such as name, images, description, category, source code link, and live preview link.

### Skills Component

- **Description:** Displays categorized skills including frontend, backend, databases, frameworks, programming languages, version control, and tools.
- **Features:** Utilizes IntersectionObserver for animation on scroll and displays skill categories dynamically.

### ContactForm Component

- **Description:** Renders a form for users to send messages to the owner.
- **Features:** Validates form inputs (name, email, subject, message) before submission and sends notifications to both owner and user upon successful submission.

### Resume Component

- **Description:** Displays resume information including skills, education, projects, and contact details.
- **State:** `showResume` (boolean) - controls visibility of detailed resume sections.

## Dependencies

### Backend Dependencies

- `@google-cloud/local-auth: ^2.1.0`
- `axios: ^1.7.2`
- `body-parser: ^1.20.2`
- `cors: ^2.8.5`
- `dotenv: ^16.4.5`
- `express: ^4.19.2`
- `nodemailer: ^6.9.13`
- `nodemon: ^3.1.3`
- `path: ^0.12.7`
- `url: ^0.11.3`

### Frontend Dependencies

- `aos: ^2.3.4`
- `axios: ^1.7.2`
- `nodemon: ^3.1.3`
- `react: ^18.3.1`
- `react-copy-to-clipboard: ^5.1.0`
- `react-dom: ^18.3.1`
- `react-markdown: ^9.0.1`
- `react-router-dom: ^6.23.1`
- `react-syntax-highlighter: ^15.5.0`
- `react-toastify: ^10.0.5`
- `rehype-raw: ^7.0.0`
- `remark-gfm: ^4.0.0`
- `vite: ^5.3.1`
- `yet-another-react-lightbox: ^3.20.0`

### Frontend Dev Dependencies

- `@types/react: ^18.2.66`
- `@types/react-dom: ^18.2.22`
- `@vitejs/plugin-react: ^4.3.1`
- `concurrently: ^8.2.2`
- `eslint: ^8.57.0`
- `eslint-plugin-react: ^7.34.1`
- `eslint-plugin-react-hooks: ^4.6.0`
- `eslint-plugin-react-refresh: ^0.4.6`
- `vite: ^5.2.0`

## Usage

### Sending Emails

Set up email options for both the owner and the user, then send the emails.

### Fetching Blogs

Make a GET request to the `/api/blogs` endpoint with an optional limit parameter to fetch the blog posts.

### Fetching Projects

Make a GET request to the `/api/projects` endpoint to fetch all the projects.

## Problems Faced During Production

### SMTP Integration with Bravo

- **Issue:** Initial integration with Bravo SMTP faced authentication errors.
- **Solution:** Correctly configured the SMTP credentials in the `.env` file and ensured the nodemailer transport settings matched the Bravo SMTP requirements.

### Hashnode API Rate Limits

- **Issue:** Fetching a large number of blog posts in a single request sometimes hit the API rate limit.
- **Solution:** Implemented pagination and limited the number of blog posts fetched per request.

### Deployment Issues

- **Issue:** Deployment to the hosting platform occasionally failed due to environment variable misconfigurations.
- **Solution:** Ensured all required environment variables were correctly set in the hosting platform's configuration.

### CORS Errors

- **Issue:** Cross-Origin Resource Sharing (CORS) errors when the frontend tried to access the backend API.
- **Solution:** Configured the cors middleware in the Express backend to allow requests from the frontend domain.

### React Router URL Issues

- **Issue:** When using React Router for client-side routing in your single page application (SPA), URL routes not working when a page is refreshed, written manually, or shared.
- **Solution:** Added necessary routes in the server configuration to handle server-side routing.

## Deployment

### Vercel and CI/CD Pipeline

- **Description:** The project is deployed on Vercel with a CI/CD pipeline. Any changes pushed to the Git repository trigger a new deployment on Vercel, ensuring the site is always up-to-date with the latest changes.
- **Steps:** Configure the Vercel project with the GitHub repository, set up environment variables in Vercel, and ensure the `vercel.json` configuration file includes necessary routes and settings.

## Live on 
-- https://bhavesh-jadhav-portfolio.vercel.app/