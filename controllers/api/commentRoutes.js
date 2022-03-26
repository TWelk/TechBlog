const router = require("express").Router();
const { User, Comment, Blog_Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const newComment = {
      post_id: req.body.postId,
      user_id: req.session.user_id,
      comment: req.body.comment,
    };
    const commentData = await Comment.create(newComment);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    const comment = commentData.get({ plain: true });
    if (req.session.user_id == comment.user_id) {
      try {
        const updateComment = await Comment.update(req.body, {
          where: { id: req.params.id },
        });
        res.status(200).json(updateComment);
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
    const search = Number(req.params.id);
    const comment = await Comment.findByPk(req.params.id);
    //Verifying that the user created this comment
    if (req.session.user_id == comment.user_id) {
      console.log("Success");
      try {
        const comments = await Comment.destroy({ where: { id: search } });
        res.status(200).json(comment);
      } catch (err) {
        res.status(404).json(err);
      }
    }
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
