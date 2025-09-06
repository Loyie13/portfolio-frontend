import { useState, useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { projectService, skillService } from '../services/api';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          projectService.getFeatured(),
          skillService.getFeatured()
        ]);
        
        setFeaturedProjects(projectsRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 glowing-margin">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyan-300 mb-4 drop-shadow-glow">Featured Work</h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Here are some of my favorite projects that showcase my skills and passion for development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {featuredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 drop-shadow-glow">📁</div>
              <h3 className="text-2xl font-semibold text-cyan-200 mb-2">No projects yet</h3>
              <p className="text-cyan-100">Projects will appear here once you add them to your backend.</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 glowing-margin">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-cyan-300 mb-4 drop-shadow-glow">Tech Stack</h2>
            <p className="text-xl text-cyan-100">Technologies I use to bring ideas to life</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map(skill => (
              <div key={skill.id} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-400/20">
                  {skill.iconUrl ? (
                    <img src={skill.iconUrl} alt={skill.name} className="w-10 h-10" />
                  ) : (
                    <span className="text-2xl text-white drop-shadow-glow">⚡</span>
                  )}
                </div>
                <h3 className="font-semibold text-cyan-100 group-hover:text-cyan-300 transition-colors">{skill.name}</h3>
                {skill.proficiency && (
                  <div className="mt-2 w-full bg-cyan-950 rounded-full h-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Custom Glow & Margin */}
        <style>
          {`
            .drop-shadow-glow {
              text-shadow: 0 0 8px #22d3ee, 0 0 16px #a21caf66;
            }
            .glowing-margin {
              box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
              border-radius: 2rem;
              margin: 2rem 0;
            }
          `}
        </style>
      </section>
      {/* Glow style for projects section */}
      <style>
        {`
          .drop-shadow-glow {
            text-shadow: 0 0 8px #22d3ee, 0 0 16px #a21caf66;
          }
          .glowing-margin {
            box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
            border-radius: 2rem;
            margin: 2rem 0;
          }
        `}
      </style>
    </div>
  );
};

export default Home;