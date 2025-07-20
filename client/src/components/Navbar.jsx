import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Menu, PlusCircle, UserCircle, X } from 'lucide-react';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/50 backdrop-blur-lg border-b border-purple-200 sticky top-0 z-50 px-4 sm:px-8 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-purple-700"
        >
          <UserCircle size={28} /> MyBlog
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 relative">
          {user ? (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1 text-purple-700 font-medium hover:underline"
              >
                <PlusCircle size={20} /> New Post
              </Link>

              {/* Profile Avatar with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user?.profilePic || assets.defaultpic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white border border-purple-200 rounded-lg shadow-lg py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-purple-50"
                      >
                        Profile
                      </Link>
                      <Link
                        to=""
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2 hover:bg-purple-50"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-purple-50"
                      >
                        <LogOut size={16} className="inline mr-1" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition shadow"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-purple-600 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-50 transition shadow"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-purple-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 flex flex-col gap-4 md:hidden overflow-hidden"
          >
            {user ? (
              <>
                <Link
                  to="/create"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-1 text-purple-700 font-medium hover:underline"
                >
                  <PlusCircle size={20} /> New Post
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.profilePic || assets.defaultpic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                  />
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-center hover:bg-purple-700 transition shadow"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="border border-purple-600 text-purple-700 px-4 py-2 rounded-full text-center hover:bg-purple-50 transition shadow"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
