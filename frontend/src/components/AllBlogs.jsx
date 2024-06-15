import React, { useEffect, useState } from './react';
import { Link } from 'react-router-dom';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = "bhavesh002"; // Your Hashnode username

  useEffect(() => {
    const fetchBlogs = async () => {
      const query = `
        query {
          user(username: "${username}") {
            publications(first: 50) {
              edges {
                node {
                  posts(first: 50) {
                    edges {
                      node {
                        title
                        brief
                        slug
                        coverImage {
                          attribution
                          photographer
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
        const response = await fetch('https://gql.hashnode.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });

        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const posts = result.data.user.publications.edges.map(edge => edge.node.posts.edges.map(postEdge => postEdge.node));
        setBlogs(posts.flat());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [username]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate'); // Add animate class when the element is visible
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
    <main id="main">
      <section id="blogs" className="blogs section-bg">
        <div className="container">
          <div className="section-title">
            <h2>All Blogs</h2>
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
        </div>
      </section>
    </main>
  );
};

export default AllBlogs;
