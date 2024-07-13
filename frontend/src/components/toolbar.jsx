import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/toolbar.css';

const Toolbar = ({ postId, postSlug }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setVisible(st <= lastScrollTop || st === 0);
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    window.open(`https://bhaveshjadhav.hashnode.dev/${postSlug}`, '_blank');
  };

  const handleComment = () => {
    window.open(`https://hashnode.com/discussions/post/${postId}`, '_blank');
  };

  const handleShareMouseEnter = () => {
    setShowShareOptions(true);
  };

  const handleShareMouseLeave = () => {
    setShowShareOptions(false);
  };

  const handleContainerMouseEnter = () => {
    setShowShareOptions(true);
  };

  const handleContainerMouseLeave = () => {
    setShowShareOptions(false);
  };

  return (
    <div className={`toolbar ${visible ? '' : 'hidden'}`}>
      <div className="toolbar-item" onClick={handleLike}>
        <i className="bi bi-heart-fill"></i>
      </div>
      <div className="toolbar-item" onClick={handleComment}>
        <i className="fa-regular fa-comments"></i>
      </div>
      <div
        className="toolbar-item"
        onMouseEnter={handleShareMouseEnter}
        onMouseLeave={handleShareMouseLeave}
      >
        <i className="fa-solid fa-share-nodes"></i>
      </div>
      <div 
        className={`share-container ${showShareOptions ? 'show' : ''}`} 
        onMouseEnter={handleContainerMouseEnter} 
        onMouseLeave={handleContainerMouseLeave}
      >
        <div className="share-options">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-icon">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this post: ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="share-icon">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
