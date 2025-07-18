import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import { CommentContext } from '../context/CommentContext';
import { AuthContext } from '../context/AuthContext';
import { Heart } from 'lucide-react';

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
      <div className="text-center py-20 animate-pulse text-gray-400">
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
      <p className="mb-6 text-gray-600">
        By {post.author.username} on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="flex items-center gap-4 mb-4">
        {user && (
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-purple-700"
          >
            <Heart size={18} />
            {post.likes?.length || 0}
          </button>
        )}
      </div>

      <div className="mb-12 leading-relaxed text-gray-800">
        {post.content}
      </div>

      <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-white/30 backdrop-blur p-4 rounded-lg border border-white/20"
          >
            <p className="font-semibold mb-1">{c.user.username}</p>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleAddComment}
        className="mt-8 flex flex-col md:flex-row gap-4"
      >
        <textarea
          placeholder="Write a comment..."
          className="flex-1 border border-white/40 bg-white/20 rounded-xl p-4 focus:ring-2 focus:ring-purple-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
