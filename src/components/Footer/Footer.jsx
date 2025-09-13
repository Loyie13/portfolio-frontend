const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gradient-to-t from-blue-950 via-gray-900 to-purple-950 text-white py-10 border-t-4 border-cyan-400/10 shadow-[0_-4px_32px_0_#22d3ee33] w-full"
      aria-label="Site Footer"
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg">Lloyd.dev</span>
          <span className="text-sm text-gray-400 mt-2">Full-Stack Developer</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 text-gray-300 font-medium">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>

        {/* Socials */}
        <div className="flex gap-6 justify-center">
          <a
            href="https://github.com/Loyie13"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="text-cyan-400 hover:text-white text-2xl transition-colors"
          >
            <span aria-hidden>📦</span>
          </a>
          <a
            href="https://linkedin.com/in/lloyd-chibwe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="text-cyan-400 hover:text-white text-2xl transition-colors"
          >
            <span aria-hidden>💼</span>
          </a>
          <a
            href="mailto:mrloyiiee@gmail.com"
            aria-label="Email"
            title="Email"
            className="text-cyan-400 hover:text-white text-2xl transition-colors"
          >
            <span aria-hidden>📧</span>
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-6 text-center text-sm text-cyan-300">
        © {currentYear} Lloyd Chibwe. Built with React & Spring Boot.
      </div>
      {/* Optional: Back to Top Button */}
      {/* 
      <a
        href="#hero"
        className="fixed bottom-6 right-6 bg-cyan-400/80 hover:bg-cyan-400 text-white rounded-full p-3 shadow-lg transition-all"
        aria-label="Back to Top"
        title="Back to Top"
      >
        ↑
      </a>
      */}
    </footer>
  );
};

export default Footer;