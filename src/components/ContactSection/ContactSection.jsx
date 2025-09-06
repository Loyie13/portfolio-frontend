import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
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

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-950 via-purple-950 to-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Get In Touch</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Have a project in mind or want to chat? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-blue-900 via-gray-900 to-purple-950 rounded-2xl shadow-2xl p-8 border-2 border-cyan-500/40"
             style={{ boxShadow: '0 0 32px 4px #6366f1, 0 0 64px 8px #a21caf44' }}>
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
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
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-blue-950 border border-cyan-500/30 rounded-lg text-cyan-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all placeholder-cyan-400"
                  placeholder="Your name"
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
              ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-center">{error}</div>
            )}

            {/* Success Message */}
            {success && (
              <div className="text-green-400 text-center">
                Thank you for your message! I'll get back to you soon.
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
            >
              📧 Email
            </a>
            <a
              href="https://linkedin.com/in/lloyd-chibwe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-glow"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/Loyie13"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors drop-shadow-glow"
            >
              📦 GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;