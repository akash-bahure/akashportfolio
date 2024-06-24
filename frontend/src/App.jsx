import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Header from './components/Header.jsx';
import Hero from './components/hero.jsx'
import About from './components/about.jsx';
import Skills from './components/skills.jsx';
import Resume from './components/resume.jsx';
import Portfolio from './components/portfolio.jsx';
import Blogs from './components/blogs.jsx';
import AllBlogs from './components/AllBlogs.jsx';
import BlogPost from './components/BlogPost';
import ContactForm from './components/contact.jsx';
import ProjectDetails from './components/projectDetails.jsx';
import ErrorBoundary from './assets/supportingFiles/ErrorBoundary.jsx';
import NotFound from './components/NotFound'; 
import Footer from './components/footer.jsx';
import './index.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import { Analytics } from "@vercel/analytics/react"


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Hero/>
          <main id="main">
            <Portfolio />
            <Blogs />
            <Skills />
            <Resume />
            <About />
            <ContactForm/>
            <Footer/>
          </main>
        </>
      ),
    },
    {
      path: '/allblogs',
      element: <><Header/><AllBlogs /></>,
    },
    {
      path:'/blog/:slug',
      element:<><Header/><main id="main"><BlogPost/></main></>,
    },
    {
      path:'/project/:id',
      element:<><Header/><main id="main"><ProjectDetails/></main></>,
    },
    {
      path:'*',
      element:<NotFound />,
    },
   
  ]);

  return <>
            <RouterProvider router={router} />
            <Analytics />
          </>;

}

export default App;
