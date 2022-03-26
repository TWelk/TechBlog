const router = require("express").Router();
const { User, Comment, Blog_Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      user_id: req.session.user_id,
      post: req.body.post,
    };
    const postData = await Blog_Post.create(newPost);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Blog_Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    if (req.session.user_id == post.user_id) {
      try {
        const updatePost = await Blog_Post.update(req.body, {
          where: { id: req.params.id },
        });
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const search = Number(req.params.id)
    const post = await Blog_Post.findByPk(search);
    //Verifying that the user created this post
    if (req.session.user_id == post.user_id) {
      console.log("Success");
      try {
        const comments = await Comment.destroy({where: {post_id: search}})
        const post = await Blog_Post.destroy(
          { where: { id: search } }
          );
        res.status(200).json(post);
      } catch (err) {
        res.status(404).json(err);
      }
    }
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
