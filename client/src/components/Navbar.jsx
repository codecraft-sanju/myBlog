import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Menu, PlusCircle, UserCircle, X } from 'lucide-react';
import { assets } from '../assets/assets';


export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/30 backdrop-blur-lg border-b border-white/20 shadow sticky top-0 z-50 px-4 sm:px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-purple-700"
        >
          <UserCircle size={28} /> MyBlog
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/create"
                className="flex items-center gap-1 text-purple-700 font-semibold hover:underline"
              >
                <PlusCircle size={20} /> New Post
              </Link>

             <Link
  to="/profile"
  className="flex items-center gap-2"
>
  {user.profilePic ? (
    <img
      src={user?.profilePic}
      alt="Profile"
      className="w-8 h-8 rounded-full object-cover"
    />
  ) : (
    <img
      src={assets.defaultpic}
      alt="Default Profile"
      className="w-8 h-8 rounded-full object-cover"
    />
  )}
</Link>


              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
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
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          {user ? (
            <>
              <Link
                to="/create"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1 text-purple-700 font-semibold hover:underline"
              >
                <PlusCircle size={20} /> New Post
              </Link>

             <Link
  to="/profile"
  onClick={() => setMenuOpen(false)}
  className="flex items-center gap-2"
>
  {user.profilePic ? (
    <img
      src={user.profilePic}
      alt="Profile"
      className="w-8 h-8 rounded-full object-cover"
    />
  ) : (
    <img
      src="./defaultProfile.png"
      alt="Default Profile"
      className="w-8 h-8 rounded-full object-cover"
    />
  )}
</Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
