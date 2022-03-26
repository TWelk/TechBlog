const router = require("express").Router();
const { User, Comment, Blog_Post } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Blog_Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                  model: User,
                  attributes: ["name"],
                },
              ],
            order: [["id", "DESC"]],
        })
        const posts = postData.map((p) => p.get({ plain: true }))
        for (let i = 0; i < posts.length; i++) {
            const element = posts[i];
            const date = new Date(element.time_created);
            element.time_created = date.toLocaleDateString("en-US", {
              hour: "numeric",
              minute: "numeric",
            });
          }
        res.render('dashboard', {
            posts,
            id: req.session.user_id,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.redirect("/login")
    }
    
    
});

module.exports = router;