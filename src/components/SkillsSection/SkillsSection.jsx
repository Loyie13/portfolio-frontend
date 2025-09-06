import { useState, useEffect } from 'react';
import { skillService } from '../../services/api';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillService.getAll();
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <section
        id="skills"
        className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 min-h-[50vh] glowing-margin"
        aria-live="polite"
        aria-label="Skills and technologies"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto" aria-label="Loading skills"></div>
            <p className="mt-4 text-cyan-200">Loading skills...</p>
          </div>
        </div>
        <style>
          {`
            .glowing-margin {
              box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
              border-radius: 2rem;
              margin: 2rem 0;
            }
          `}
        </style>
      </section>
    );
  }

  return (
    <section
      id="skills"
      tabIndex="-1"
      aria-label="Skills and technologies"
      className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 glowing-margin"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4 drop-shadow-glow">Tech Stack</h2>
          <p className="text-xl text-cyan-100">Technologies I use to bring ideas to life</p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="text-center">
              <h3 className="text-2xl font-semibold text-cyan-200 mb-6 drop-shadow-glow">{category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categorySkills.map(skill => (
                  <div
                    key={skill.id}
                    tabIndex="0"
                    className="bg-blue-900/60 hover:bg-cyan-900/60 border border-blue-900/40 rounded-xl px-4 py-3 transition-all duration-200 group shadow-lg shadow-cyan-400/10 focus:ring-2 focus:ring-cyan-400 animate-fade-in"
                  >
                    <div className="flex items-center space-x-2">
                      {skill.iconUrl ? (
                        <img src={skill.iconUrl} alt={skill.name} className="w-6 h-6" />
                      ) : (
                        <span className="text-lg text-cyan-300 drop-shadow-glow">⚡</span>
                      )}
                      <span className="font-medium text-cyan-100 group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </span>
                    </div>
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
          ))}
        </div>
      </div>
      {/* Custom Glow & Animation */}
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
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default SkillsSection;