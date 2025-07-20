import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required.' });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePic')
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username',
    );
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    if (!post) return res.status(404).json({ message: 'Post not found.' });

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({
      likesCount: post.likes.length,
      likedByUser: post.likes.includes(userId),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
