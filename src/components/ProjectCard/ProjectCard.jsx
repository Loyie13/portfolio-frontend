import React from "react";

const ProjectCard = ({ project }) => {
  // Make the whole card clickable if projectUrl or githubUrl exists
  const handleCardClick = () => {
    if (project.projectUrl) {
      window.open(project.projectUrl, "_blank");
    } else if (project.githubUrl) {
      window.open(project.githubUrl, "_blank");
    }
  };

  return (
    <div
      className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 rounded-2xl shadow-2xl overflow-hidden hover:shadow-cyan-500/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] group border border-blue-900/40 focus-within:ring-2 focus-within:ring-cyan-400 cursor-pointer"
      tabIndex="0"
      aria-label={`Project card: ${project.title || 'Project'}`}
      onClick={handleCardClick}
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && (project.projectUrl || project.githubUrl)) {
          handleCardClick();
        }
      }}
      style={{ minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      role="listitem"
    >
      {/* Project Image */}
      <div className="h-48 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-700 relative overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title || 'Project image'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl text-white opacity-80 drop-shadow-glow">🚀</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg shadow-yellow-400/40 animate-pulse">
            ⭐ Featured
          </div>
        )}

        {/* Hover Overlay */}
        {(project.projectUrl || project.githubUrl) && (
          <div className="absolute inset-0 bg-cyan-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span className="text-white text-lg font-bold">
              {project.projectUrl ? "View Project" : "View Code"}
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-cyan-200 mb-3 group-hover:text-cyan-400 transition-colors drop-shadow-glow">
            {project.title}
          </h3>

          <p className="text-blue-100 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map(tech => (
                <span
                  key={tech}
                  className="bg-cyan-900/60 text-cyan-200 text-xs px-3 py-1 rounded-full font-medium shadow shadow-cyan-400/20 transition-transform duration-200 hover:scale-110"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span
                  className="bg-gray-800/80 text-gray-300 text-xs px-3 py-1 rounded-full cursor-pointer"
                  tabIndex="0"
                  title={project.technologies.slice(4).join(', ')}
                  aria-label={`More technologies: ${project.technologies.slice(4).join(', ')}`}
                >
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Project Links and Status */}
        <div className="flex justify-between items-center mt-auto pt-4">
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-white transition-colors font-semibold outline-none focus:ring-2 focus:ring-cyan-400 rounded"
                aria-label="View source code on GitHub"
                tabIndex="0"
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
              >
                <span className="text-lg">📦</span> Code
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white transition-colors font-semibold outline-none focus:ring-2 focus:ring-purple-400 rounded"
                aria-label="View live demo"
                tabIndex="0"
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
              >
                <span className="text-lg">🌐</span> Live Demo
              </a>
            )}
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
            project.published
              ? 'bg-green-700/30 text-green-300'
              : 'bg-yellow-700/30 text-yellow-200'
          }`}>
            {project.published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      {/* Custom Glow */}
      <style>
        {`
          .drop-shadow-glow {
            text-shadow: 0 0 8px #22d3ee, 0 0 16px #a21caf66;
          }
        `}
      </style>
    </div>
  );
};

export default ProjectCard;