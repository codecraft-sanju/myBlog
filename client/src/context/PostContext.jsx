import { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const isAuthenticated = !!user;

  const getPosts = async (page = 1, limit = 10) => {
    const res = await API.get(`/posts?page=${page}&limit=${limit}`);
    setPosts(res.data);
  };

  const getPostById = async (id) => {
    const res = await API.get(`/posts/${id}`);
    return res.data;
  };

  const createPost = async (title, content) => {
    if (!isAuthenticated) {
      toast.error('Please login first.');
      return;
    }
    await API.post('/posts', { title, content }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    getPosts();
  };

  const updatePost = async (id, data) => {
    if (!isAuthenticated) {
      toast.error('Please login first.');
      return;
    }
    await API.put(`/posts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    getPosts();
  };

  const deletePost = async (id) => {
    if (!isAuthenticated) {
      toast.error('Please login first.');
      return;
    }
    await API.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    getPosts();
  };



  const likePost = async (id) => {
    if (!isAuthenticated) {
      toast.error('Please login first.');
      return;
    }
    const res = await API.put(`/posts/${id}/like`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    toast.success(res.data.likedByUser ? 'Liked!' : 'Unliked!');
    getPosts(); 
    return res.data; 
  };

  
   useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost,
        likePost, 
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
