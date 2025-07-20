import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Loader2 } from 'lucide-react';

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      await register(username, email, password);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Register Error:', err);
      const errorMsg = err.response?.data?.message || 'Something went wrong.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-green-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleRegister}
        className="bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <UserPlus size={32} className="text-green-600" />
          <h2 className="text-4xl font-extrabold text-gray-800">Join MyBlog</h2>
        </motion.div>

        <div className="relative mb-6">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/40 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/40 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-8">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/40 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-4 rounded-xl font-semibold transition focus:ring-4 focus:ring-green-300"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Creating...
            </>
          ) : (
            <>Create Account</>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
