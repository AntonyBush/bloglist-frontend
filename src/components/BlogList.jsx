import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </>
  );
};

export default BlogList;
