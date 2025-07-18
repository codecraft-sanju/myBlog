import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill all fields.');
      return;
    }

    try {
      await register(username, email, password);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Register Error:', err);
      const errorMsg = err.response?.data?.message || 'Something went wrong.';
      toast.error(errorMsg);
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
        className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <UserPlus size={32} className="text-green-600" />
          <h2 className="text-4xl font-extrabold text-gray-800">Join MyBlog</h2>
        </div>

        <div className="relative mb-6">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/20 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/20 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-8">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/20 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition focus:ring-4 focus:ring-green-300"
        >
          Create Account
        </button>
      </motion.form>
    </motion.div>
  );
}
