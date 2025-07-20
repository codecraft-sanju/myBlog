import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import { CommentContext } from '../context/CommentContext';
import { AuthContext } from '../context/AuthContext';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PostDetail() {
  const { id } = useParams();
  const { getPostById, likePost } = useContext(PostContext);
  const { getComments, addComment } = useContext(CommentContext);
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostById(id);
      setPost(postData);

      const commentsData = await getComments(id);
      setComments(commentsData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addComment(id, text);
    const commentsData = await getComments(id);
    setComments(commentsData);
    setText('');
  };

  const handleLike = async () => {
    await likePost(id);
    const postData = await getPostById(id);
    setPost(postData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-purple-600 text-xl font-semibold animate-pulse">
        Loading post...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 px-4 py-12">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 rounded-3xl bg-white/20 backdrop-blur-2xl shadow-2xl border border-white/20 p-6 md:p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Main Content */}
        <div className="md:col-span-2 flex flex-col">
          <motion.header
            className="mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-purple-900 mb-2 break-words">
              {post.title}
            </h1>
            <p className="text-gray-600 text-sm">
              By{' '}
              <span className="font-semibold text-purple-800">{post.author.username}</span>{' '}
              • {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </motion.header>

          {user && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium px-5 py-2 rounded-full transition shadow hover:shadow-md mb-6 w-fit"
            >
              <Heart size={20} className="fill-purple-600" />
              {post.likes?.length || 0} Likes
            </motion.button>
          )}

          <motion.article
            className="text-gray-800 leading-relaxed whitespace-pre-line break-words text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {post.content}
          </motion.article>
        </div>

        {/* Comments */}
        <aside className="space-y-6 sticky top-10 h-fit">
          <motion.h2
            className="text-lg md:text-xl font-bold text-purple-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Comments ({comments.length})
          </motion.h2>

          <motion.div
            className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {comments.map((c) => (
              <motion.div
                key={c._id}
                className="flex items-start gap-4 bg-white/50 backdrop-blur-lg p-4 rounded-2xl border border-white/30 shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.02 }}
              >
                {c.user.profilePic ? (
                  <img
                    src={c.user.profilePic}
                    alt={c.user.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-purple-600 shadow"
                  />
                ) : (
                  <div className="flex-shrink-0 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase shadow">
                    {c.user.username.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-purple-800 mb-1 break-words">
                    {c.user.username}
                  </p>
                  <p className="text-gray-700 break-words">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {user && (
            <motion.form
              onSubmit={handleAddComment}
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <textarea
                placeholder="Write your comment..."
                className="border border-purple-200 bg-white/50 backdrop-blur rounded-2xl p-4 focus:ring-2 focus:ring-purple-400 resize-none text-gray-800 shadow"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-full font-semibold transition shadow hover:shadow-lg w-fit self-end"
              >
                Post Comment
              </button>
            </motion.form>
          )}
        </aside>
      </motion.div>

      <style jsx="true">{`
        .custom-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scroll {
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
