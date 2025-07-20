import { useState, useEffect, useContext, useRef } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, Heart, Trash2 } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TestimonialsSlider from '../components/TestimonialsSlider';
import toast from 'react-hot-toast';

export default function Home() {
  const { posts: globalPosts, getPosts, likePost, deletePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [bigHearts, setBigHearts] = useState({});
  const [loading, setLoading] = useState(true);

  // Mobile double tap detector ref
  const lastTapRef = useRef({});

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await getPosts();
      setLoading(false);
    };
    fetchPosts();
  }, []);

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

    //  Optimistic update
    if (hasLiked) {
      post.likes = post.likes.filter((id) => id !== user.id);
    } else {
      post.likes = [...post.likes, user.id];
    }

    updatedPosts[postIndex] = post;
    setPosts(updatedPosts);

    try {
      await likePost(postId);
    } catch {
      // toast.error('Could not update like, reverting...');
      // Rollback
      post.likes = hasLiked ? [...post.likes, user.id] : post.likes.filter((id) => id !== user.id);
      updatedPosts[postIndex] = post;
      setPosts(updatedPosts);
    }
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    toast.success('Post deleted.');
  };

  const hasUserLiked = (post) => post.likes?.includes(user.id);

  // Double click handler (desktop) + show heart
  const handleDoubleClick = (post) => {
    if (!user) return;
    if (!hasUserLiked(post)) {
      // Show big heart immediately
      setBigHearts((prev) => ({ ...prev, [post._id]: true }));
      setTimeout(() => {
        setBigHearts((prev) => ({ ...prev, [post._id]: false }));
      }, 800);
      handleLike(post._id);
    }
  };

  //  Mobile double tap handler
  const handleTouch = (post) => {
    const now = Date.now();
    const lastTap = lastTapRef.current[post._id] || 0;

    if (now - lastTap < 300) {
      handleDoubleClick(post);
    }

    lastTapRef.current[post._id] = now;
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
        <motion.section
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
                    onTouchStart={() => handleTouch(post)}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/20 backdrop-blur-lg shadow-2xl transition-all duration-500 cursor-pointer"
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
                      {/* Title */}
                      <div className="mb-3">
                        <span className="block text-xs uppercase tracking-wider text-purple-600 font-semibold mb-1">
                          Title
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight break-words hyphens-auto line-clamp-2">
                          {post.title}
                        </h2>
                      </div>

                      {/* Author + Date */}
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
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>

                      {/* Content */}
                      <div className="mb-6 flex-1">
                        <span className="block text-xs uppercase tracking-wider text-purple-600 font-semibold mb-1">
                          Content
                        </span>
                        <p className="text-gray-700 break-words hyphens-auto overflow-hidden line-clamp-3">
                          {post.content}
                        </p>
                      </div>

                    <Link
  to={`/post/${post._id}`}
  className="relative hidden md:inline-flex items-center gap-2 px-5 py-2 border border-purple-700 text-purple-700 font-semibold overflow-hidden group transition-transform duration-300"
>
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Read More
  </span>
  <ArrowRight
    size={16}
    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
  />
  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
  <span className="absolute inset-0 bg-white/20 blur-lg translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out"></span>
</Link>

{/* Simple link for mobile */}
<Link
  to={`/post/${post._id}`}
  className="md:hidden inline-flex items-center gap-2 text-purple-700 font-semibold underline"
>
  Read More <ArrowRight size={16} />
</Link>

                      {/* Like */}
                      {user && (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLike(post._id)}
                          className={`mt-4 flex items-center gap-2 ${
                            hasUserLiked(post) ? 'text-red-600' : 'text-gray-600'
                          }`}
                        >
                          <Heart
                            size={18}
                            fill={hasUserLiked(post) ? 'red' : 'none'}
                          />
                          <span>{post.likes?.length || 0} Likes</span>
                        </motion.button>
                      )}

                      {/* Delete */}
                      {isOwner && (
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="mt-2 flex items-center gap-2 text-red-700"
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
        </motion.section>
      )}

      <TestimonialsSlider />
    </>
  );
}
