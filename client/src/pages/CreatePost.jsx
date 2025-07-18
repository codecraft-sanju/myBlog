import { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2, PencilLine, FileText } from 'lucide-react';

export default function CreatePost() {
  const { createPost } = useContext(PostContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and Content are required.');
      return;
    }
    try {
      setIsLoading(true);
      await createPost(title, content);
      toast.success('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white/20 border border-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-center items-center gap-3 mb-8">
          <PencilLine size={32} className="text-purple-700" />
          <h1 className="text-4xl font-extrabold text-gray-800">Create Post</h1>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="relative">
            <FileText size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Title"
              className="w-full pl-12 pr-4 py-4 border border-white/40 bg-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Content..."
            className="w-full p-4 border border-white/40 bg-white/30 rounded-xl h-52 resize-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Publish'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
