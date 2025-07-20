import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const token = localStorage.getItem('token')
  return (
    <section className={`relative flex flex-col md:flex-row items-center justify-between text-center md:text-left py-40 px-8 bg-gradient-to-br from-purple-50 to-purple-200 overflow-hidden ${token && "hidden"}`}>
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, 80, 0], y: [0, 80, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, -80, 0], y: [0, -80, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* Illustration Left Side */}
      <motion.img
        src="./freelancer.svg"
        alt="Creative Illustration"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-64 md:w-[400px] mb-12 md:mb-0 md:mr-12"
      />

      {/* Right Content */}
      <div className="flex flex-col items-center md:items-start max-w-2xl">
        {/* Main Headline */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight"
        >
          Unleash Your Ideas
        </motion.h1>

        {/* Gradient Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 origin-left"
        />

        {/* Sub Headline */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 mb-10"
        >
          Write, share and discover stories, experiences and knowledge — from creators worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Link
            to="/create"
            className="inline-block bg-gradient-to-r from-purple-700 to-pink-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transform transition duration-300"
          >
            Start Writing
          </Link>
          <Link
            to="/register"
            className="inline-block border-2 border-purple-700 text-purple-700 px-10 py-4 rounded-full font-semibold hover:bg-purple-700 hover:text-white transition duration-300 shadow-md"
          >
            Join Community
          </Link>
        </motion.div>
      </div>

      {/* Floating Shape */}
      <motion.div
        className="absolute -z-10 w-[400px] h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      ></motion.div>
    </section>
  );
}
