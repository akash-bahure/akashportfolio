import React, { useEffect, useRef, useState } from 'react';
import portfolioImg1 from '../assets/img/portfolio/project1.jpg'; // Ensure this path is correct
import portfolioImg2 from '../assets/img/portfolio/project2.jpg'; // Ensure this path is correct
import portfolioImg3 from '../assets/img/portfolio/project3.jpg'; // Ensure this path is correct


const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('*');

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
    const items = portfolioRef.current.querySelectorAll('.portfolio-item');

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
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);

    // Trigger animation by removing and adding animate class after a short delay
    const items = portfolioRef.current.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      item.classList.remove('animate');
      setTimeout(() => {
        item.classList.add('animate');
      }, 10); // Adjust the delay as needed
    });
  };

  return (
    <section id="portfolio" className="portfolio section-bg">
      <div className="container" ref={portfolioRef}>
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>Welcome to my portfolio! Here, I showcase my projects and achievements. From web development to design and beyond, each project represents my passion for creating meaningful solutions. Dive in to explore how I bring ideas to life and solve challenges through innovative solutions. Let's connect and discuss how we can collaborate on your next project!</p>

        </div>
        <div className="col-lg-12 d-flex justify-content-center">
          <ul id="portfolio-flters">
            <li 
              data-filter="*" 
              className={activeFilter === '*' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('*')}
            >
              All
            </li>
            <li 
              data-filter=".filter-mini" 
              className={activeFilter === '.filter-mini' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('.filter-mini')}
            >
              Mini Projects
            </li>
            <li 
              data-filter=".filter-mega" 
              className={activeFilter === '.filter-mega' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('.filter-mega')}
            >
              Mega Projects
            </li>
          </ul>
        </div>
        <div className="row portfolio-container">
          <div className={`col-lg-4 col-md-6 portfolio-item filter-mini ${activeFilter === '*' || activeFilter === '.filter-mini' ? 'show' : 'hide'}`}>
            <div className="portfolio-wrap">
              <div className="portfolio-info">
                <h4>Personal portfolio</h4>
              </div>
              <img src={portfolioImg1} className="img-fluid" alt="" />
            </div>
            <div className="portfolio-links">
              <a href="" className="portfolio-source-btn">Source code</a>
              <a href="" className="portfolio-preview-btn">Live Preview</a>
            </div>
          </div>
          <div className={`col-lg-4 col-md-6 portfolio-item filter-mega ${activeFilter === '*' || activeFilter === '.filter-mega' ? 'show' : 'hide'}`}>
            <div className="portfolio-wrap">
              <div className="portfolio-info">
                <h4>Agro Mall</h4>
              </div>
              <img src={portfolioImg2} className="img-fluid" alt="" />
            </div>
            <div className="portfolio-links">
              <a href="https://github.com/Bhaveshj008/Agro_Mall_2.0" className="portfolio-source-btn">Source code</a>
              <a href="https://agromall.000webhostapp.com/" className="portfolio-preview-btn">Live Preview</a>
            </div>
          </div>
          <div className={`col-lg-4 col-md-6 portfolio-item filter-mini ${activeFilter === '*' || activeFilter === '.filter-mini' ? 'show' : 'hide'}`}>
            <div className="portfolio-wrap">
              <div className="portfolio-info">
                <h4>Whether and Notepad app</h4>
              </div>
              <img src={portfolioImg3} className="img-fluid" alt="" />
            </div>
            <div className="portfolio-links">
              <a href="https://github.com/Bhaveshj008/whether-notepad-app" className="portfolio-source-btn">Source code</a>
              <a href="https://weather-notepad-app.vercel.app/" className="portfolio-preview-btn">Live Preview</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
