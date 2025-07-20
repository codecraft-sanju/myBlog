import User from '../models/User.js';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

//  ImageKit Config
export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

//  Test ImageKit connection
export const testImagekitConnection = async () => {
  try {
    
    const result = await imagekit.listFiles({ limit: 1 });
    
  } catch (err) {
    console.error(' ImageKit connection failed:', err.message);
  }
};

export const updateProfile = async (req, res) => {
  try {

    const { username, email } = req.body;
    let profilePicUrl = '';

    if (req.file) {
      const file = req.file.buffer.toString('base64');

      const uploadResponse = await imagekit.upload({
        file,
        fileName: `profile_${Date.now()}`,
      });
      profilePicUrl = uploadResponse.url;
    }

    const user = await User.findById(req.user.id);
    

    if (!user) {
      
      return res.status(404).json({ message: 'User not found.' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (profilePicUrl) user.profilePic = profilePicUrl;

    await user.save();

    

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error(' [DEBUG] ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};
