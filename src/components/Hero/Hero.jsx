import { useState, useEffect, useRef } from "react";

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

  // Parallax state
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

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

  // Parallax effect for particles
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 text-white flex items-center justify-center relative"
    >
      {/* Animated Programming Particle Background with Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span
          className="absolute left-[80%] top-[70%] text-3xl animate-particle2 select-none"
          style={{
            transform: `translate(${parallax.x * 20}px, ${parallax.y * 10}px)`
          }}
        >🐍</span>
        <span
          className="absolute left-1/2 top-1/2 text-3xl animate-particle3 select-none"
          style={{
            transform: `translate(${parallax.x * -10}px, ${parallax.y * 20}px)`
          }}
        >⚛️</span>
        <span
          className="absolute left-[20%] top-[80%] text-3xl animate-particle4 select-none"
          style={{
            transform: `translate(${parallax.x * 15}px, ${parallax.y * -10}px)`
          }}
        >🌐</span>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Profile Image with Animated Gradient Border */}
        <div className="w-32 h-32 mb-8 rounded-full p-1 animated-gradient-border flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="/profile.JPG"
              alt="Lloyd Chibwe profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-2 text-lg text-cyan-200 font-mono animate-fade-in text-center">{greeting}</div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-2 drop-shadow-[0_2px_24px_rgba(34,211,238,0.6)] text-center">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Lloyd
          </span>
        </h1>

        {/* Typing Effect */}
        <div className="mb-6 h-8 text-center">
          <span className="text-cyan-300 text-2xl font-mono">{displayed}&nbsp;</span>
          <span className="text-cyan-400 animate-pulse">|</span>
        </div>

        {/* Description in Glowing Box */}
        <div className="mx-auto mb-8 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-6 py-6 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-purple-950/80 border border-cyan-400/30 shadow-lg glowing-desc-box">
          <p className="text-xl text-blue-200 drop-shadow-[0_2px_12px_rgba(34,211,238,0.3)] text-center">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-center"
            aria-label="View My Work"
            style={{ boxShadow: "0 0 24px 4px #22d3ee55" }}
          >
            View My Work →
          </a>
          <a
            href="/resume.pdf"
            download
            className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md shadow-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-center"
            aria-label="Download Resume"
            style={{ boxShadow: "0 0 16px 2px #22d3ee44" }}
          >
            Download Resume
          </a>
          <a
            href="mailto:mrloyiiee@gmail.com?subject=Request%20for%20Certificates"
            className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md shadow-purple-400/30 focus:outline-none focus:ring-2 focus:ring-purple-400 text-center"
            aria-label="Request Certificates"
            style={{ boxShadow: "0 0 16px 2px #a21caf44" }}
          >
            Request Certificates
          </a>
        </div>

        <p className="text-purple-300 mt-4 text-center">
          Certificates available upon request.
        </p>
      </div>
      {/* Custom Glow for Description Box & Animations */}
      <style>
        {`
          .glowing-desc-box {
            box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
          }
          .animated-gradient-border {
            background: linear-gradient(270deg, #22d3ee, #a21caf, #818cf8, #22d3ee);
            background-size: 600% 600%;
            animation: gradient-border 8s ease infinite;
          }
          @keyframes gradient-border {
            0% {background-position:0% 50%}
            50% {background-position:100% 50%}
            100% {background-position:0% 50%}
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          /* Particle Animations */
          @keyframes particle2 { 0%{top:70%;} 50%{top:30%;} 100%{top:70%;} }
          @keyframes particle3 { 0%{left:50%;} 50%{left:60%;} 100%{left:50%;} }
          @keyframes particle4 { 0%{top:80%;} 50%{top:20%;} 100%{top:80%;} }
          .animate-particle2 { animation: particle2 10s ease-in-out infinite; }
          .animate-particle3 { animation: particle3 7s ease-in-out infinite; }
          .animate-particle4 { animation: particle4 9s ease-in-out infinite; }
        `}
      </style>
    </section>
  );
}