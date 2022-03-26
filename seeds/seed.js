const sequelize = require("../config/connection");
const Blog_Post = require("../models/Blog_Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Role = require("../models/Role");

const postData = require("./postData.json");
const commentData = require("./commentData.json");
const userData = require("./userData.json");
const roleData = require("./roleData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Roles = await Role.bulkCreate(roleData);
  const Users = await User.bulkCreate(userData);
  const Blog_Posts = await Blog_Post.bulkCreate(postData);
  const Comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
