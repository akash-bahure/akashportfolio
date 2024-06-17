import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs?limit=3');
        setBlogs(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const items = document.querySelectorAll('.blog-item');

    items.forEach(item => {
      observer.observe(item);
    });

    return () => {
      if (items) {
        items.forEach(item => {
          observer.unobserve(item);
        });
      }
    };
  }, [blogs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching blogs: {error.message}</p>;

  return (
    <section id="blogs" className="blogs section-bg">
      <div className="container">
        <div className="section-title">
          <h2>My Blogs</h2>
          <p>Welcome to my learning journey! Explore my latest articles where I share insights and discoveries from topics I'm currently exploring. From beginner-friendly explanations to practical tips, my blog is a place where I simplify complex ideas and share my learning adventures. Join me in discovering new perspectives and expanding our knowledge together!</p>
        </div>
        <div className="row">
          {blogs && blogs.length > 0 && blogs.map((blog, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <Link to={`/blog/${blog.slug}`} className="read-more">
                <div className="blog-item">
                  <img src={blog.coverImage.url} alt={blog.title} className="img-fluid" />
                  <div className="blog-info">
                    <h4>{blog.title}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button className="download-button"><Link to="/allblogs">View All Blogs</Link></button>
      </div>
    </section>
  );
};

export default Blogs;
