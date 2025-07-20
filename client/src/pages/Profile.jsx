import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(user?.profilePic || '');
  const [newPic, setNewPic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (newPic) formData.append('profilePic', newPic);

    try {
      const updated = await updateProfile(formData);
      setProfilePic(updated.profilePic);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-800">
          My Profile
        </h2>

        <form onSubmit={handleProfileUpdate} className="flex flex-col gap-6">
          <div className="flex flex-col items-center relative group w-40 h-40 mx-auto">
            <img
              src={profilePic || '/defaultProfile.png'}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-purple-400 shadow-md"
            />

            <motion.div
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              {loading ? (
                <svg
                  className="animate-spin h-10 w-10 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                <Camera className="h-10 w-10 text-white" />
              )}
            </motion.div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setNewPic(e.target.files[0]);
                  setProfilePic(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Your username"
              className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Your email"
              className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition font-semibold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
