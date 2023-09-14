import Blog from "./Blog";

const BlogList = ({ blogs, name, handleLogout }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
