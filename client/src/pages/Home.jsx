import { useEffect, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User2, Calendar, ArrowRight, Heart, Trash2 } from 'lucide-react';

export default function Home() {
  const { posts, getPosts, likePost, deletePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

 
  const handleLike = async (postId) => {
    await likePost(postId);
  };

  console.log(posts._id)

  const handleDelete = async (postId) => {
    await deletePost(postId);
  };

  return (
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
          {posts.map((post) => {
            const isOwner = user && user.id === post.author._id;

            return (
              <motion.div
                key={post._id}
                className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                {/* Hover Light Ring */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  whileHover={{
                    background:
                      'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
                  }}
                />

                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-3 leading-tight">
                    {post.title}
                  </h2>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <User2 size={16} className="mr-2 text-purple-600" />
                    {post.author.username}
                    <Calendar size={16} className="ml-4 mr-2 text-purple-600" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>

                  <p className="text-gray-700 mb-6 line-clamp-4 flex-1">
                    {post.content}
                  </p>

                  <Link
                    to={`/post/${post._id}`}
                    className="flex z-10 items-center cursor-pointer gap-2 text-purple-700 font-semibold hover:underline mt-auto"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>

                  {/* Like button */}
                  {user && (
                    <button
                      onClick={() => handleLike(post._id)}
                      className="mt-4 flex items-center z-10 gap-2 text-red-500 hover:underline"
                    >
                      
                      <Heart size={18} />
                      {post.likes?.length || 0} Likes
                    </button>
                  )}

                  {/* Delete button only for owner */}
                  {isOwner && (
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="mt-2 flex items-center z-10 gap-2 text-red-700 hover:underline"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  )}
                </div>

                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/5 opacity-0 transition duration-500"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
