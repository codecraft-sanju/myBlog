import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect } from 'react';

export default function Footer() {

    const token = localStorage.getItem('token')
   

  return (
    <footer className={`bg-white/20 backdrop-blur-xl border-t border-white/20 mt-20 ${token ? "hidden" :""}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-extrabold text-purple-700 mb-2">MyBlog</h2>
          <p className="text-gray-700 max-w-xs">
            Share your thoughts, connect with people, and explore ideas in a clean, beautiful space.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/create" className="hover:underline">Create Post</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:underline">My Profile</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline">Register</Link>
            </li>
          </ul>
        </div>

        {/* Social + Copyright */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-700 transition"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-700 transition"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-700 transition"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
