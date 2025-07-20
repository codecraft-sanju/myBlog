import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Jayvardhan', comment: 'Love this platform! Highly recommended.' },
  { name: 'Chirag Soni', comment: 'Amazing experience, so easy to use.' },
  { name: 'Niraj', comment: 'My audience grew overnight!' },
  { name: 'Rohit Choudhary', comment: 'Best blogging site ever!' },
  { name: 'Alisha', comment: 'Clean UI and super fast.' },
  { name: 'Nisha', comment: 'I enjoy writing here every day.' },
  { name: 'Harish', comment: 'Perfect for sharing thoughts.' },
  { name: 'Hannah', comment: 'This platform made me a writer! I absolutely love how easy it is to write long posts without any problem. This is a super long comment to test the wrapping!' },
];

export default function TestimonialsSlider() {
  const token = localStorage.getItem('token')
  return (
    <section className={`relative overflow-hidden py-20 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 ${token && "hidden"}`}>
      <h2 className="text-center text-4xl font-extrabold text-purple-700 mb-12">
        What Our Users Say
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30,
          }}
        >
          {[...testimonials, ...testimonials].map((t, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 mx-4 bg-white/20 backdrop-blur-md border border-purple-200/50 rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-500"
            >
              <Quote className="text-purple-600 mb-4" />
              <p className="text-gray-800 italic mb-4 leading-relaxed break-words">
                “{t.comment}”
              </p>
              <p className="text-purple-700 font-bold text-right">
                — {t.name}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-purple-50 via-transparent to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-purple-50 via-transparent to-transparent z-10" />
      </div>
    </section>
  );
}
