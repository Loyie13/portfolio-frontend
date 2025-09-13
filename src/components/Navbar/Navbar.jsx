import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Skip to content focus
  useEffect(() => {
    const skipLink = document.getElementById('skip-to-content');
    if (skipLink) {
      skipLink.addEventListener('click', () => {
        const main = document.getElementById('main-content');
        if (main) main.focus();
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section highlight
      const offsets = navLinks
        .map((link) => {
          const el = document.getElementById(link.id);
          return el ? { id: link.id, offset: el.offsetTop } : null;
        })
        .filter(Boolean);

      const scrollY = window.scrollY + 100; // adjust for navbar height
      const current = offsets
        .reverse()
        .find((section) => scrollY >= section.offset);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility for mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        id="skip-to-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-cyan-700 text-white px-4 py-2 rounded z-50"
      >
        Skip to content
      </a>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-purple-950/90 backdrop-blur-md shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg transition-all duration-300 focus:outline-none"
                aria-label="Go to Home"
                style={{ cursor: 'pointer' }}
              >
                Lloyd.dev
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-3 py-2 rounded-md text-sm font-semibold transition-colors
                    ${
                      activeSection === link.id
                        ? 'text-cyan-400'
                        : 'text-cyan-100 hover:text-white'
                    }
                    before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-cyan-400 before:transition-all before:duration-300 hover:before:w-3/4`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  style={{ overflow: 'hidden' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-cyan-200 hover:text-white text-3xl focus:outline-none"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Escape") setMenuOpen(false);
                }}
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden bg-gradient-to-br from-blue-950 via-blue-900 to-purple-950/95 px-6 pb-6 pt-2 shadow-xl animate-fade-in-down"
            tabIndex={-1}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-cyan-100 hover:text-white text-lg font-semibold py-2 transition-colors ${
                    activeSection === link.id ? 'text-cyan-400' : ''
                  }`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Custom animation */}
        <style>
          {`
            @keyframes fade-in-down {
              from { opacity: 0; transform: translateY(-16px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-fade-in-down {
              animation: fade-in-down 0.3s ease;
            }
          `}
        </style>
      </nav>
    </>
  );
};

export default Navbar;