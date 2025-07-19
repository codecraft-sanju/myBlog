import { createContext, useContext } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const getComments = async (postId) => {
    const res = await API.get(`/comments/${postId}`);
    return res.data;
  };

  const addComment = async (postId, text) => {
    if (!isAuthenticated) {
      toast.error('Please login first.');
      return;
    }
    await API.post(`/comments/${postId}`, { text });
  };

  const deleteComment = async (commentId) => {
    if (!isAuthenticated) {
      toast.error('Please login first.');
      return;
    }
    await API.delete(`/comments/${commentId}`);
  };

  return (
    <CommentContext.Provider value={{ getComments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};
