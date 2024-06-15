import React, { useEffect, useRef } from 'react';

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-skills');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const skillElements = skillsRef.current.querySelectorAll('.skill-category');
    skillElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
          <p>Explore my skills section to discover the strengths I bring to the table. From technical proficiencies to interpersonal abilities, each skill reflects my dedication to excellence and continuous improvement. I am committed to applying these skills effectively to achieve organizational goals and deliver outstanding results.</p>

        </div>
        <div className="skills-table">
          <div className="skill-category">
            <div className="skill-category-name">Frontend</div>
            <div className="skill-items">HTML, CSS, JS, React, Ajax, jQuery, Bootstrap, Tailwind CSS</div>
          </div>
          <div className="skill-category">
            <div className="skill-category-name">Backend</div>
            <div className="skill-items">Node.js, Express, PHP, Python</div>
          </div>
          <div className="skill-category">
            <div className="skill-category-name">Databases</div>
            <div className="skill-items"> MongoDB, MySQL</div>
          </div>
          <div className="skill-category">
            <div className="skill-category-name">Frameworks</div>
            <div className="skill-items">Node.js, Express</div>
          </div>
          <div className="skill-category">
            <div className="skill-category-name">Programming Languages</div>
            <div className="skill-items">JS, PHP, Python, Java, C</div>
          </div>
          <div className="skill-category">
            <div className="skill-category-name">Version Control</div>
            <div className="skill-items">Git, GitHub</div>
          </div>
          <div className="skill-category">
            <div className="skill-category-name">Tools</div>
            <div className="skill-items">Postman, VScode</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
