const postModel = require("../models/post/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll({});
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await postModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await postModel.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postModel.findByPk(req.params.id);
    // if (!post) {
    //   return res.status(404).json({
    //     status: "error",
    //     message: "Post not found",
    //   });
    // }
    await post.update(
      { ...req.body },
      {
        where: {
          id: post
        }
      }
    );
    
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    await post.destroy();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
