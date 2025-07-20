import { useState, useEffect, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  ArrowRight,
  Heart,
  Trash2,
} from 'lucide-react';

import HeroSection from '../components/HeroSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import toast from 'react-hot-toast';

export default function Home() {
  const { posts: globalPosts, getPosts, likePost, deletePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [bigHearts, setBigHearts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await getPosts();
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // keep local in sync if context updates
  useEffect(() => {
    setPosts(globalPosts);
  }, [globalPosts]);

  const handleLike = async (postId) => {
    if (!user) return;

    const postIndex = posts.findIndex((p) => p._id === postId);
    if (postIndex === -1) return;

    const updatedPosts = [...posts];
    const post = { ...updatedPosts[postIndex] };

    const hasLiked = post.likes.includes(user.id);

    // ✅ Optimistic update
    if (hasLiked) {
      post.likes = post.likes.filter((id) => id !== user.id);
    } else {
      post.likes = [...post.likes, user.id];
    }
    updatedPosts[postIndex] = post;
    setPosts(updatedPosts);

    try {
      await likePost(postId);
    } catch (err) {
      // rollback
      toast.error('Could not update like, reverting...');
      updatedPosts[postIndex] = { ...post, likes: hasLiked ? [...post.likes, user.id] : post.likes.filter((id) => id !== user.id) };
      setPosts(updatedPosts);
    }
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
  };

  const hasUserLiked = (post) => {
    return post.likes?.includes(user.id);
  };

  const handleDoubleClick = async (post) => {
    if (!user) return;

    if (!hasUserLiked(post)) {
      // Big heart only on like
      setBigHearts((prev) => ({ ...prev, [post._id]: true }));
      setTimeout(() => {
        setBigHearts((prev) => ({ ...prev, [post._id]: false }));
      }, 800);
    }

    handleLike(post._id);
  };

  const Loader = () => (
    <motion.div
      className="flex flex-col items-center justify-center h-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-purple-600 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
      />
      <p className="mt-4 text-purple-600 font-semibold">Loading posts...</p>
    </motion.div>
  );

  return (
    <>
      <HeroSection />

      {loading ? (
        <Loader />
      ) : (
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
                      <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
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
      )}

      <TestimonialsSlider />
    </>
  );
}
