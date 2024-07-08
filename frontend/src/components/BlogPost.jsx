import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '../assets/supportingFiles/codeblock.jsx'; 
import '../assets/css/blogpost.css';
import axios from 'axios';

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

    return () => {
      if (postContainerRef.current) {
        observer.unobserve(postContainerRef.current);
      }
    };
  }, [post]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error fetching post: {error.message}</p>;

  const CustomImage = ({ alt, src, align }) => {
    const alignment = align || 'center';
    const style = {
      display: 'block',
      margin: alignment === 'center' ? '0 auto' : alignment === 'left' ? '0 auto 0 0' : '0 0 0 auto',
    };

    return <img src={src} alt={alt} style={style} />;
  };

  return (
    <div ref={postContainerRef} className="post-container">
      <h2 className="post-title">{post.title}</h2>
      {post.coverImage && <img src={post.coverImage.url} alt={post.title} className="post-image" />}
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
              const align = node.properties.align;
              return <CustomImage {...props} align={align} />;
            },
          }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
