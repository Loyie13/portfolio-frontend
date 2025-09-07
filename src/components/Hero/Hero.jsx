import { useState, useEffect } from "react";

const GREETING_UPDATE_INTERVAL_MS = 60 * 1000;

const roles = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Tech Enthusiast",
  "Problem Solver"
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 18) return "Good afternoon,";
  return "Good evening,";
}

export default function Hero() {
  // Typing effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Greeting state
  const [greeting, setGreeting] = useState(getGreeting());

  // Typing effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.substring(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }, 60);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.substring(0, displayed.length + 1));
        if (displayed.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  // Update greeting on time change
  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), GREETING_UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to projects
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 text-white flex items-center justify-center relative"
    >
      {/* Animated Programming Particle Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Emojis as particles */}
        {/* <span className="absolute left-[10%] top-[18%] text-4xl animate-particle1 select-none">☕</span> */}
        <span className="absolute left-[80%] top-[70%] text-3xl animate-particle2 select-none">🐍</span>
        <span className="absolute left-[50%] top-[50%] text-3xl animate-particle3 select-none">⚛️</span>
        <span className="absolute left-[20%] top-[80%] text-3xl animate-particle4 select-none">🌐</span>
        {/* <span className="absolute left-[70%] top-[20%] text-3xl animate-particle5 select-none">💻</span> */}
        {/* You can add more or swap for SVG icons */}
      </div>

      <div className="text-center px-4 max-w-3xl mx-auto relative z-10">
        {/* Profile Image with Glow */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 shadow-xl shadow-cyan-400/40 animate-pulse">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="/profile.JPG"
              alt="Lloyd Chibwe profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-2 text-lg text-cyan-200 font-mono animate-fade-in">{greeting}</div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-2 drop-shadow-[0_2px_24px_rgba(34,211,238,0.6)]">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Lloyd
          </span>
        </h1>

        {/* Typing Effect */}
        <div className="mb-6 h-8">
          <span className="text-cyan-300 text-2xl font-mono">{displayed}&nbsp;</span>
          <span className="text-cyan-400 animate-pulse">|</span>
        </div>

        {/* Description in Glowing Box */}
        <div className="mx-auto mb-12 max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-6 py-6 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-purple-950/80 border border-cyan-400/30 shadow-lg glowing-desc-box">
          <p className="text-xl text-blue-200 drop-shadow-[0_2px_12px_rgba(34,211,238,0.3)]">
            Results-driven and adaptable Computer Science graduate with 2+ years of
            hands-on experience in building scalable full-stack applications using
            Java (Spring Boot) and Python (Flask). Proven expertise in developing
            and optimizing RESTful APIs, reducing processing times by 30%, and
            implementing robust database solutions. Seeking to leverage technical
            skills and innovative problem-solving abilities in a challenging software
            engineering role. Agile collaborator with excellent communication
            skills, capable of thriving in diverse and distributed teams.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="View My Work"
            style={{ boxShadow: "0 0 24px 4px #22d3ee55" }}
          >
            View My Work →
          </a>
          <a
            href="/resume.pdf"
            download
            className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Download Resume"
            style={{ boxShadow: "0 0 16px 2px #22d3ee44" }}
          >
            Download Resume
          </a>
          <a
            href="mailto:mrloyiiee@gmail.com?subject=Request%20for%20Certificates"
            className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md shadow-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Request Certificates"
            style={{ boxShadow: "0 0 16px 2px #a21caf44" }}
          >
            Request Certificates
          </a>
        </div>
        <p className="text-purple-300 mt-4">
          Certificates available upon request.
        </p>
      </div>
      {/* Custom Glow for Description Box & Animations */}
      <style>
        {`
          .glowing-desc-box {
            box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          /* Particle Animations */
          /* @keyframes particle1 { 0%{top:18%;} 50%{top:70%;} 100%{top:18%;} } */
          @keyframes particle2 { 0%{top:70%;} 50%{top:30%;} 100%{top:70%;} }
          @keyframes particle3 { 0%{left:50%;} 50%{left:60%;} 100%{left:50%;} }
          @keyframes particle4 { 0%{top:80%;} 50%{top:20%;} 100%{top:80%;} }
          /* @keyframes particle5 { 0%{left:70%;} 50%{left:30%;} 100%{left:70%;} } */
          /* .animate-particle1 { animation: particle1 8s ease-in-out infinite; } */
          .animate-particle2 { animation: particle2 10s ease-in-out infinite; }
          .animate-particle3 { animation: particle3 7s ease-in-out infinite; }
          .animate-particle4 { animation: particle4 9s ease-in-out infinite; }
          /* .animate-particle5 { animation: particle5 11s ease-in-out infinite; } */
        `}
      </style>
    </section>
  );
}