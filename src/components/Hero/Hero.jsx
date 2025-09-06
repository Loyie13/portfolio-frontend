export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950 text-white flex items-center justify-center"
    >
      <div className="text-center px-4 max-w-3xl mx-auto">
        {/* Profile Image with Glow */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 shadow-xl shadow-cyan-400/40 animate-pulse">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="/profile.JPG" // Place your image in the public folder as profile.jpg or update the path accordingly
              alt="Lloyd Chibwe profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-[0_2px_24px_rgba(34,211,238,0.6)]">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            Lloyd
          </span>
        </h1>

        {/* Description in Glowing Box */}
        <div className="mx-auto mb-12 max-w-2xl md:max-w-4xl px-6 py-6 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-purple-950/80 border border-cyan-400/30 shadow-lg glowing-desc-box">
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
        </div>
      </div>
      {/* Custom Glow for Description Box */}
      <style>
        {`
          .glowing-desc-box {
            box-shadow: 0 0 32px 8px #22d3ee55, 0 0 64px 16px #a21caf44;
          }
        `}
      </style>
    </section>
  );
}