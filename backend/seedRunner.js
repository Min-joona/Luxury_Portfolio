const Blog = require('./models/Blog');
const Project = require('./models/Project');
const Design = require('./models/Design');
const Admin = require('./models/Admin');
const { blogs } = require('./data/blogData');
const projects = require('./data/projectData');
const designs = require('./data/designData');

async function runSeed() {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);

  await Project.deleteMany({});
  await Project.insertMany(projects);

  await Design.deleteMany({});
  await Design.insertMany(designs);

  let adminCreated = false;
  if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (!existing) {
      await Admin.create({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD });
      adminCreated = true;
    }
  }

  return { blogs: blogs.length, projects: projects.length, designs: designs.length, adminCreated };
}

module.exports = runSeed;
