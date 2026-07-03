/** Core seed logic for the portfolio: blog articles + admin bootstrap. */
const Blog = require('./models/Blog');
const Admin = require('./models/Admin');

// Blog content lives in seedBlogs.js as a standalone script; the article
// data is duplicated here in require-able form via a shared module.
const { blogs } = require('./data/blogData');

async function runSeed() {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);

  // Bootstrap the admin account only if configured and absent.
  let adminCreated = false;
  if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (!existing) {
      await Admin.create({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD });
      adminCreated = true;
    }
  }

  return { blogs: blogs.length, adminCreated };
}

module.exports = runSeed;
