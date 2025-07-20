import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center text-center py-40 px-4 bg-gradient-to-br from-purple-50 to-purple-200 overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
        style={{ zIndex: -1 }}
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
        style={{ zIndex: -1 }}
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* Main Headline */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight"
      >
        Unleash Your Ideas
      </motion.h1>

      {/* Sub Headline */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
      >
        Write, share and discover stories, experiences and knowledge — from creators worldwide.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <Link
          to="/create"
          className="inline-block bg-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-800 transition"
        >
          Start Writing
        </Link>
        <Link
          to="/register"
          className="inline-block border-2 border-purple-700 text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-purple-700 hover:text-white transition"
        >
          Join Community
        </Link>
      </motion.div>

      {/* Decorative Floating Shape */}
      <motion.div
        className="absolute -z-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      ></motion.div>
    </section>
  );
}  