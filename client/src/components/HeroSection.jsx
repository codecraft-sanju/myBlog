import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';

export default function HeroSection() {
  const token = localStorage.getItem('token');

  return (
    <section
      className={`relative flex flex-col md:flex-row items-center justify-between text-center md:text-left py-28 md:py-40 px-6 md:px-12 bg-gradient-to-br from-purple-50 to-purple-200 overflow-hidden ${
        token && 'hidden'
      }`}
    >
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 60, 0], y: [0, 60, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -60, 0], y: [0, -60, 0] }}
        transition={{ repeat: Infinity, duration: 24, ease: 'easeInOut' }}
      />

      {/* Illustration Left Side */}
      <motion.img
        src="./freelancer.svg"
        alt="Creative Illustration"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-56 md:w-[400px] mb-8 md:mb-0 md:mr-16"
      />

      {/* Right Content */}
      <div className="flex flex-col items-center md:items-start max-w-2xl">
        {/* Main Headline */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-3 leading-tight tracking-tight"
        >
          Unleash <br className="hidden md:inline" /> Your Ideas
        </motion.h1>

        {/* Gradient Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 w-28 md:w-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 origin-left"
        />

        {/* Sub Headline */}
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-xl"
        >
          Write, share and discover stories, experiences and knowledge — from
          creators worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row gap-5"
        >
           <Link
            to="/create"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-transform duration-300"
          >
            Start Writing
            <motion.span
              className="flex items-center"
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Pen size={20} className="text-white" />
            </motion.span>
          </Link>
          <Link
            to="/register"
            className="inline-block border-2 border-purple-700 text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-purple-700 hover:text-white hover:shadow-md transition duration-300"
          >
            Join Community
          </Link>
        </motion.div>
      </div>

      {/* Floating Shape */}
      <motion.div
        className="absolute -z-10 w-[350px] h-[350px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      ></motion.div>
    </section>
  );
}
