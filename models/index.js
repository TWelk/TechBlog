const User = require("./User");
const Comment = require("./Comment");
const Blog_Post = require("./Blog_Post");
const Role = require("./Role");

Blog_Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog_Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Blog_Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog_Post.belongsTo(User, {
  foreignKey: "user_id",
});

Role.hasMany(User, {
  foreignKey: "role_id",
  onDelete: "CASCADE"
})

User.belongsTo(Role, {
  foreignKey: "role_id"
})

module.exports = { User, Comment, Blog_Post, Role };
