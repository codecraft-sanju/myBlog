import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { CommentProvider } from './context/CommentContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile'; 
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <CommentProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route  path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              /> 
            </Routes>
              <Footer /> 
          </BrowserRouter>
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
