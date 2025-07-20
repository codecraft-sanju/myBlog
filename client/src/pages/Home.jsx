import { useState, useEffect, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  User2,
  Calendar,
  ArrowRight,
  Heart,
  Trash2,
} from 'lucide-react';

import HeroSection from '../components/HeroSection'; 
import TestimonialsSlider from '../components/TestimonialsSlider'; 


export default function Home() {
  const { posts, getPosts, likePost, deletePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const [bigHearts, setBigHearts] = useState({});

  useEffect(() => {
    getPosts();
  }, []);

  const handleLike = async (postId) => {
    await likePost(postId);
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
  };

  const hasUserLiked = (post) => {
    return post.likes?.includes(user.id);
  };

  const handleDoubleClick = async (post) => {
    if (!user) return;

    if (hasUserLiked(post)) {
      await likePost(post._id);
    } else {
      await likePost(post._id);
      setBigHearts((prev) => ({ ...prev, [post._id]: true }));
      setTimeout(() => {
        setBigHearts((prev) => ({ ...prev, [post._id]: false }));
      }, 800);
    }
  };

  return (
    <>
      {/* ✅ HERO SECTION */}
      <HeroSection />

      {/* ✅ POSTS SECTION */}
      <motion.div
        className="max-w-7xl mx-auto py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="flex justify-center items-center gap-4 mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <BookOpen size={36} className="text-purple-700" />
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Explore Posts
          </h1>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {posts.map((post, index) => {
              const isOwner = user && user.id === post.author._id;

              return (
                <motion.div
                  key={post._id}
                  onDoubleClick={() => handleDoubleClick(post)}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/20 backdrop-blur-lg shadow-2xl group transition-all duration-500 cursor-pointer"
                  whileHover={{ scale: 1.04, rotate: -1 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Big heart animation */}
                  <AnimatePresence>
                    {bigHearts[post._id] && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center z-20"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <Heart
                          size={120}
                          className="text-red-600 drop-shadow-2xl"
                          fill="red"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative p-6 flex flex-col h-full z-10">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-3 leading-tight">
                      {post.title}
                    </h2>

                    <div className="flex items-center text-gray-600 text-sm mb-4 gap-3">
                      {post.author.profilePic ? (
                        <img
                          src={post.author.profilePic}
                          alt={post.author.username}
                          className="w-8 h-8 rounded-full object-cover border-2 border-purple-600"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                          {post.author.username[0].toUpperCase()}
                        </div>
                      )}
                      <span>{post.author.username}</span>
                      <span className="text-gray-400">•</span>
                      <Calendar size={16} className="text-purple-600" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-6 line-clamp-4 flex-1">
                      {post.content}
                    </p>

                    <Link
                      to={`/post/${post._id}`}
                      className="flex items-center gap-2 text-purple-700 font-semibold hover:underline"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>

                    {user && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(post._id)}
                        className={`mt-4 flex items-center gap-2 ${
                          hasUserLiked(post)
                            ? 'text-red-600'
                            : 'text-gray-600'
                        } hover:underline`}
                      >
                        <Heart
                          size={18}
                          fill={hasUserLiked(post) ? 'red' : 'none'}
                        />
                        <span>{post.likes?.length || 0} Likes</span>
                      </motion.button>
                    )}

                    {isOwner && (
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="mt-2 flex items-center gap-2 text-red-700 hover:underline"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      {/*  TESTIMONIALS SLIDER */}
      <TestimonialsSlider />

    </>
  );
}
