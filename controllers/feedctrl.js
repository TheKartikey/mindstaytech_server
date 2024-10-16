const Feed = require('../models/feedmodel');

// Create new post
const createFeed = async (req, res) => {

  try {
    const { postTitle, postDescription } = req.body;
    const postImage = req.file ? req.file.buffer : undefined;
    const newPost = new Feed({
      postTitle,
      postDescription,
      postImage
    });

    await newPost.save();

    return res.status(200).json({ success: true, message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const GetFeed = async (req, res) => {
  try {
    const AdminPosts = await Feed.find()
    const adminPostWithImage = AdminPosts.map(post => {
      const adminPostData = post.toJSON();
      if (adminPostData.postImage) {
        const base64Image = Buffer.from(adminPostData.postImage).toString('base64')
        adminPostData.postImage = base64Image
      }
      return adminPostData;
    })
    res.json(adminPostWithImage)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });

  }
}

const DeleteFeed = async (req, res) => {
  try {
    const { _id } = req.params;
    await Feed.findByIdAndDelete(_id);
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    console.log('error during delete', error);
    res.status(500).json({ error: 'an error occurred' });
  }
}

module.exports = { createFeed, GetFeed,DeleteFeed };
