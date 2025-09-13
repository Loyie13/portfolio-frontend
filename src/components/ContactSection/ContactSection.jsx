import { useState, useRef, useEffect } from 'react';

// SVG Icons for social links
const EmailIcon = () => (
  <svg width="24" height="24" fill="none" className="inline-block align-middle mr-1" aria-hidden="true">
    <rect width="24" height="24" rx="6" fill="#06b6d4"/>
    <path d="M6 8l6 5 6-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="6" y="8" width="12" height="8" rx="2" stroke="#fff" strokeWidth="1.5"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="24" height="24" fill="none" className="inline-block align-middle mr-1" aria-hidden="true">
    <rect width="24" height="24" rx="6" fill="#06b6d4"/>
    <path d="M8 10v6M12 13v3M16 10v6M8 7.5a1 1 0 110 2 1 1 0 010-2z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="24" height="24" fill="none" className="inline-block align-middle mr-1" aria-hidden="true">
    <rect width="24" height="24" rx="6" fill="#06b6d4"/>
    <path d="M12 17.5c4.5 0 6.5-2 6.5-6.5S16.5 4.5 12 4.5 5.5 6.5 5.5 11 7.5 17.5 12 17.5z" stroke="#fff" strokeWidth="1.5"/>
    <path d="M10 14s.5.5 2 .5 2-.5 2-.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // Honeypot field for spam protection
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Auto-hide success/error messages after 5s
  useEffect(() => {
    if (success || error) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Parallax effect
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!validateEmail(formData.email)) errors.email = "Please enter a valid email address.";
    if (!formData.message) errors.message = "Message is required.";
    return errors;
  };

  const errors = validate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Honeypot check
    if (formData.website) {
      setError('Spam detected.');
      setShowMessage(true);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setError('Please fill in all required fields correctly.');
      setShowMessage(true);
      return;
    }

    setLoading(true);

    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setShowMessage(true);
      setFormData({ name: '', email: '', message: '', website: '' });
      setFormData({ name: '', email: '', message: '', website: '' });
    }, 1200);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess(false);
  };


  const handleDismissMessage = () => setShowMessage(false);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="py-20 bg-gradient-to-br from-blue-950 via-purple-950 to-gray-900 min-h-screen animate-fade-in relative overflow-hidden"
    >
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-lg opacity-70 z-10"></div>

      {/* Parallax background effect */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${50 + parallax.x * 10}% ${50 + parallax.y * 10}%, #22d3ee22 0%, transparent 70%)`
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Get In Touch
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Have a project in mind or want to chat? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <div
          className="bg-gradient-to-br from-blue-900 via-gray-900 to-purple-950 rounded-2xl shadow-2xl p-8 border-2 border-cyan-500/40"
          style={{ boxShadow: '0 0 32px 4px #6366f1, 0 0 64px 8px #a21caf44' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
            {/* Honeypot field */}
            <input
              type="text"
              name="website"
              className="hidden"
              autoComplete="off"
              tabIndex="-1"
              value={formData.website}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-required="true"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-blue-950 border border-cyan-500/30 rounded-lg text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all placeholder-cyan-400"
                  placeholder="Your name"
                  aria-describedby={error ? "name-error" : undefined}
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-blue-950 border border-cyan-500/30 rounded-lg text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all placeholder-cyan-400"
                  placeholder="your.email@example.com"
                  aria-describedby={error ? "email-error" : undefined}
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                aria-required="true"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-blue-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-400"
                placeholder="Tell me about your project or just say hello!"
                aria-describedby={error ? "message-error" : undefined}
              ></textarea>
            </div>

            {/* Error Message */}
            {error && showMessage && (
              <div className="flex items-center justify-center text-red-400 text-center gap-2" aria-live="polite" id="form-error">
                <span aria-hidden="true">❌</span>
                {error}
                <button
                  onClick={handleDismissMessage}
                  className="ml-2 text-red-300 hover:text-red-200"
                  aria-label="Dismiss error message"
                >
                  ✖️
                </button>
              </div>
            )}

            {/* Success Message */}
            {success && showMessage && (
              <div className="flex items-center justify-center text-green-400 text-center gap-2" aria-live="polite">
                <span aria-hidden="true">✅</span>
                Thank you for your message! I'll get back to you soon.
                <button
                  onClick={handleDismissMessage}
                  className="ml-2 text-green-300 hover:text-green-200"
                  aria-label="Dismiss success message"
                >
                  ✖️
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/40 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              aria-label="Send Message"
              disabled={loading}
              style={{ boxShadow: '0 0 16px 2px #06b6d4, 0 0 32px 4px #a21caf44' }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Alternative Contact Info */}
        <div className="text-center mt-12">
          <p className="text-blue-200 mb-4">Or reach out directly:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:mrloyiiee@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-glow"
              aria-label="Email"
            >
              <EmailIcon /> Email
            </a>
            <a
              href="https://linkedin.com/in/lloyd-chibwe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-glow"
              aria-label="LinkedIn"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a
              href="https://github.com/Loyie13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-glow"
              aria-label="GitHub"
            >
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(32px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 1s cubic-bezier(.4,0,.2,1);
          }
          .drop-shadow-glow {
            text-shadow: 0 0 8px #22d3ee, 0 0 16px #a21caf66;
          }
        `}
      </style>
    </section>
  );
};

export default ContactSection;