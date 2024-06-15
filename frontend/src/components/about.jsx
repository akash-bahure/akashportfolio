import React, { useEffect, useRef } from './react';
import profileImg from '../assets/img/profile-img.jpg';

const About = () => {
  const aboutRef = useRef(null);
  const profileImgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profileImgRef.current.classList.add('animate-profile');
          contentRef.current.classList.add('animate-content');
          observer.unobserve(entry.target); // Optional: Stop observing once animation is triggered
        }
      });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">
        <div className="section-title">
          <h2>About</h2>
          <p>I'm dedicated to building practical applications that positively impact users. My expertise covers both front-end and back-end development, allowing me to contribute effectively to diverse projects. Currently, I'm also enthusiastic about learning DevOps to streamline development processes and deliver efficient solutions.</p>
        </div>
        <div className="row">
          <div className="col-lg-4">
        <img src={profileImg} className="img-fluid about-img" alt="" ref={profileImgRef} />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content" ref={contentRef}>
            <h3>Web Developer.</h3>
            <p className="fst-italic">
            I specialize in creating user-friendly web solutions focused on functionality and usability. With a Master's degree in Computer Applications (MCA), I bring a strong foundation in software development and a passion for solving real-world challenges.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>31 Oct 2002</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.bhaveshjadhav.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+91 9067872194</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Nashik, Maharashtra</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>22</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Master in Computer Applications (MCA)</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>bhavesh002jadhav@gmail.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>
            <p>
            I thrive in collaborative environments where creativity and teamwork drive success. Beyond coding, I actively pursue continuous learning and explore new technologies to deliver innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
