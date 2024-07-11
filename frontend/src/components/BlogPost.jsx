// BlogPost.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '../assets/supportingFiles/codeblock.jsx'; 
import '../assets/css/blogpost.css';
import axios from 'axios';
import ImageComponent from './blogImages.jsx'; // Adjust the path based on your project structure

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const postContainerRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

    if (postContainerRef.current) {
      observer.observe(postContainerRef.current);
    }
  }, [post]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error fetching post: {error.message}</p>;

  return (
    <div ref={postContainerRef} className="post-container">
      <h1 className="post-title"><strong>{post.title}</strong></h1>
      {post.coverImage && <img src={post.coverImage.url} alt={post.title} className="post-image" />}
      
      <div className="post-details">
  <div className="read-time">{post.readTimeInMinutes} min read</div>
  <div className="reaction-count"><i className="bi-heart-fill"></i>{post.reactionCount} likes</div>
  <div className="published-at">Published on {new Date(post.publishedAt).toLocaleDateString()}</div>
</div>
      
      
      
      <div className="post-content">
        <ReactMarkdown
          children={post.content.markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, className, children, ...props }) {
              const hasNewLines = /\n/.test(children);
              if (hasNewLines) {
                return <CodeBlock {...props}>{children}</CodeBlock>;
              } else {
                return <code className="inline-code" {...props}>{children}</code>;
              }
            },
            img: ({ node, ...props }) => {
              return <ImageComponent {...props} />;
            },
          }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
