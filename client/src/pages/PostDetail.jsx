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
      <div className="text-center py-32 text-gray-500 animate-pulse">
        Loading post...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4 break-words">
            {post.title}
          </h1>
          <p className="text-gray-700 text-sm">
            By{' '}
            <span className="font-semibold">{post.author.username}</span> •{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </header>

        <div className="mb-8">
          {user && (
            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium px-4 py-2 rounded-full transition"
            >
              <Heart size={20} className="fill-purple-600" />
              {post.likes?.length || 0} Likes
            </button>
          )}
        </div>

        <article className="text-gray-800 leading-relaxed mb-12 whitespace-pre-line break-words">
          {post.content}
        </article>

        <section>
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Comments ({comments.length})
          </h2>

          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="flex items-start gap-4 bg-white/50 backdrop-blur p-4 rounded-2xl border border-white/30"
              >
                <div className="flex-shrink-0 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase">
                  {c.user.username.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-purple-800 mb-1 break-words">
                    {c.user.username}
                  </p>
                  <p className="text-gray-700 break-words">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          {user && (
            <form
              onSubmit={handleAddComment}
              className="mt-8 flex flex-col gap-4"
            >
              <textarea
                placeholder="Write your comment..."
                className="border border-purple-200 bg-white/40 rounded-2xl p-4 focus:ring-2 focus:ring-purple-400 resize-none text-gray-800 shadow-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <button
                type="submit"
                className="self-end bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-purple-700 transition"
              >
                Post Comment
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
