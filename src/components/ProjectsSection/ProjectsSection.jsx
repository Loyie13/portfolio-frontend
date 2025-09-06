import { useState, useEffect } from 'react';
import { projectService } from '../../services/api';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.getAll();
        setProjects(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Make sure your backend is running on port 5000.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        tabIndex="-1"
        className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 min-h-[50vh] glowing-margin"
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"
              aria-label="Loading projects"
            ></div>
            <p className="mt-4 text-cyan-200">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 min-h-[50vh] glowing-margin"
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-400">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      tabIndex="-1"
      className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 glowing-margin"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4 drop-shadow-glow">Featured Work</h2>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Here are some of my favorite projects that showcase my skills and passion for development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="animate-fade-in">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 drop-shadow-glow">📁</div>
            <h3 className="text-2xl font-semibold text-cyan-200 mb-2">No projects yet</h3>
            <p className="text-cyan-100">Add some projects through your backend API!</p>
          </div>
        )}
      </div>
      {/* Custom Glow & Animation */}
      <style>
        {`
          .drop-shadow-glow {
            text-shadow: 0 0 8px #22d3ee, 0 0 16px #a21caf66;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
          }
          .glowing-margin {
            box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
            border-radius: 2rem;
            margin: 2rem 0;
          }
        `}
      </style>
    </section>
  );
};

export default ProjectsSection;