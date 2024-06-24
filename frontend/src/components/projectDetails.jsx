import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import CodeBlock from '../assets/supportingFiles/codeblock.jsx';
import '../assets/css/projectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

 

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % project.images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + project.images.length) % project.images.length);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error fetching project: {error.message}</p>;

  return (
    <div className="project-detail">
        <div className="project-title">
      <h1>Project {project.id} : {project.name}</h1></div>
      
      {project.images && project.images.length > 0 && (
        <div className="carousel-container">
          <div
            className="carousel-slide"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {project.images.map((image, index) => (
              <img key={index} src={`/api/project_images/${image}`} alt={`Image ${index}`} className="img-fluid" />
            ))}
          </div>
          <div className="carousel-controls">
            <button className="carousel-button" onClick={prevSlide}>
            <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="carousel-button" onClick={nextSlide}>
            <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
      {project.video && (
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="315"
              src={project.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <div className="project-links">
      <div className="portfolio-links">
                  
                  <a href={project.sourceCode} className="portfolio-source-btn">Source code</a>
                  <a href={project.livePreview} className="portfolio-preview-btn">Live Preview</a>
                </div>
      </div>
      <div className="project-description">
        <ReactMarkdown
          children={project.description}
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
          }}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
