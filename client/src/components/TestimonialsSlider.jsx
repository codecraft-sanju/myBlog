import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Jayvardhan', comment: 'Love this platform! Highly recommended.' },
  { name: 'Chirag Soni', comment: 'Amazing experience, so easy to use.' },
  { name: 'Niraj', comment: 'My audience grew overnight!' },
  { name: 'Rohit Choudhary', comment: 'Best blogging site ever!' },
  { name: 'Alisha', comment: 'Clean UI and super fast.' },
  { name: 'Nisha', comment: 'I enjoy writing here every day.' },
  { name: 'Harish', comment: 'Perfect for sharing thoughts.' },
  {
    name: 'Hannah',
    comment:
      'This platform made me a writer! I absolutely love how easy it is to write long posts without any problem. This is a super long comment to test the wrapping!',
  },
];

export default function TestimonialsSlider() {
  const token = localStorage.getItem('token');
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, isMobile ? 5000 : 2000); // Mobile: 5s per comment, Desktop: smooth slider
    return () => clearInterval(interval);
  }, [isMobile]);

  if (token) return null;

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">
        Voices of Our Creators
      </h2>
      <p className="text-center text-purple-600 text-lg md:text-xl mb-12">
        Real feedback from writers & creators who trust us.
      </p>

      {isMobile ? (
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="w-[90%] max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-purple-300/40 rounded-3xl shadow-2xl p-8 text-center space-y-6 relative overflow-hidden"
            >
              {/* Profile icon with gradient ring */}
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 blur-sm opacity-80"></div>
                  <div className="relative w-20 h-20 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-3xl shadow-inner border-4 border-white">
                    {testimonials[index].name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              <Quote className="text-purple-500 w-10 h-10 mx-auto" />
              <p className="text-gray-900 italic leading-relaxed break-words text-lg font-medium">
                “{testimonials[index].comment}”
              </p>
              <p className="text-purple-800 font-extrabold text-xl tracking-wide">
                —{' '}
                {testimonials[index].name.charAt(0).toUpperCase() +
                  testimonials[index].name.slice(1)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 25,
            }}
          >
            {[...testimonials, ...testimonials].map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-80 mx-6 bg-white/10 backdrop-blur-xl border border-purple-200/30 rounded-3xl shadow-xl p-8 transition-transform duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none"></div>
                <Quote className="text-purple-500 mb-6" />
                <p className="text-gray-900 italic mb-6 leading-relaxed break-words text-base font-medium">
                  “{t.comment}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-400 blur-sm opacity-80"></div>
                    <div className="relative w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-lg shadow-inner border-2 border-white">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <p className="text-purple-800 font-bold text-lg">
                    — {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-purple-50 via-transparent to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-purple-50 via-transparent to-transparent z-10" />
        </div>
      )}
    </section>
  );
}
