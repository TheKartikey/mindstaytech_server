const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    try {
      const { title, description, batch_no } = req.body;
  
      // Check if the video file is uploaded
      if (!req.files || !req.files.postImageURL) {
        return res.status(400).json({ error: 'No video file uploaded' });
      }
  
      const ImageFile = req.files.postImageURL;
  
      // Define the new folder for video uploads
      const PostImageDir = path.join(__dirname, '..', 'post_materials');
      const videoUploadPath = path.join(PostImageDir, videoFile.name);
  
      // Create the folder if it doesn't exist
      if (!fs.existsSync(PostImageDir)) {
        fs.mkdirSync(PostImageDir, { recursive: true });
      }
  
      // Move the uploaded video file to the specified folder
      ImageFile.mv(videoUploadPath, async (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
  
        // Save the video details to the database
        const relativeVideoPath = `${ImageFile.name}`;
        const studyMaterial = new videoModel({
          title,
          description,
          videoURL: relativeVideoPath, 
          batch_no
        });
  
        await studyMaterial.save();
        res.status(200).json({
          message: 'Video material uploaded successfully',
          studyMaterial,
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };






// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch posts in descending order of creation
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { name, profession, title, description, mode, budget } = req.body;
    const profileImageUrl = req.file?.profileImageUrl;
    const descriptionImageUrl = req.file?.descriptionImageUrl;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Update the post fields
    post.name = name || post.name;
    post.profession = profession || post.profession;
    post.profileImageUrl = profileImageUrl || post.profileImageUrl;
    post.title = title || post.title;
    post.description = description || post.description;
    post.descriptionImageUrl = descriptionImageUrl || post.descriptionImageUrl;
    post.mode = mode || post.mode;
    post.budget = budget || post.budget;

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.likes += 1; // Increment likes
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};



module.exports = {createPost}