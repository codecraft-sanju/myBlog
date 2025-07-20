import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const token = localStorage.getItem('token');

  return (
    <footer
      className={`bg-white/20 backdrop-blur-xl border-t border-white/20 mt-20 ${
        token ? 'hidden' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-3xl font-extrabold text-purple-700 mb-4">
            MyBlog
          </h2>
          <p className="text-gray-700 max-w-xs leading-relaxed">
            Share your thoughts, connect with people, and explore ideas in a
            clean, beautiful space.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { name: 'Home', to: '/' },
              { name: 'Create Post', to: '/create' },
              { name: 'My Profile', to: '/profile' },
              { name: 'Login', to: '/login' },
              { name: 'Register', to: '/register' },
            ].map((link) => (
              <li key={link.name} className="group">
                <Link
                  to={link.to}
                  className="text-gray-700 inline-block relative pb-1 font-medium"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-purple-500 to-purple-700 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Copyright */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Connect with Me
            </h3>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/codecraft-sanju"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-700 hover:text-purple-700 transition transform hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 blur opacity-0 hover:opacity-60 transition"></div>
                <Github size={28} className="relative z-10" />
              </a>

              <a
                href="https://linkedin.com/in/sanjaychoudhary99"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-700 hover:text-purple-700 transition transform hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 blur opacity-0 hover:opacity-60 transition"></div>
                <Linkedin size={28} className="relative z-10" />
              </a>

              <a
                href="https://instagram.com/sanjuuu_x18"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-700 hover:text-purple-700 transition transform hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 blur opacity-0 hover:opacity-60 transition"></div>
                <Instagram size={28} className="relative z-10" />
              </a>

              <a
                href="https://x.com/sanjay_x18"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-gray-700 hover:text-purple-700 transition transform hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 blur opacity-0 hover:opacity-60 transition"></div>
                <Twitter size={28} className="relative z-10" />
              </a>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-10 md:mt-0">
            &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
