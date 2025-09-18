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
      className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4 drop-shadow-glow">Tech Stack</h2>
          <p className="text-xl text-cyan-100">Technologies I use to bring ideas to life</p>
        </div>

        {/* Animated Glowing Skill Boxes */}
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              tabIndex="0"
              role="listitem"
              className="relative glowing-skill-box px-6 py-6 rounded-2xl shadow-lg border border-cyan-400/30 bg-gradient-to-br from-blue-900/80 via-blue-950/80 to-purple-950/80 flex flex-col items-center justify-center min-w-[180px] max-w-xs animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rotating-border w-full h-full rounded-2xl"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                {skill.iconUrl ? (
                  <img src={skill.iconUrl} alt={skill.name} className="w-10 h-10 mb-2" />
                ) : (
                  <span className="text-2xl text-cyan-300 drop-shadow-glow mb-2">⚡</span>
                )}
                <span className="font-semibold text-cyan-100 text-lg mb-2">{skill.name}</span>
                {skill.info && (
                  <span className="text-xs text-cyan-200 mb-2">{skill.info}</span>
                )}
                {skill.proficiency && (
                  <div className="w-full bg-cyan-950 rounded-full h-2 relative mb-2">
                    <div
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-cyan-200 font-semibold">
                      {skill.proficiency}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom Glow & Animation */}
      <style>
        {`
          .drop-shadow-glow {
            text-shadow: 0 0 8px #2563eb, 0 0 16px #1e3a8a99;
          }
          .glowing-skill-box {
            box-shadow: 0 0 24px 4px #2563eb55, 0 0 32px 8px #1e3a8a44;
            position: relative;
            overflow: visible;
          }
          .rotating-border {
            border: 4px solid transparent;
            border-radius: 1rem;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0; left: 0;
            pointer-events: none;
            z-index: 1;
            background: conic-gradient(
              from 0deg,
              #1e3a8a 0deg 60deg,    /* blue-900 */
              #2563eb 60deg 120deg,  /* blue-600 */
              #1e40af 120deg 180deg, /* blue-800 */
              #312e81 180deg 240deg, /* indigo-900 */
              #3b82f6 240deg 300deg, /* blue-500 */
              #1e3a8a 300deg 360deg  /* blue-900 */
            );
            mask-image: linear-gradient(#fff 0 0);
            -webkit-mask-image: linear-gradient(#fff 0 0);
            animation: rotateBorder 4s linear infinite;
          }
          @keyframes rotateBorder {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
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