import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog,user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = () => {
    updateBlog({ likes: blog.likes + 1 }, blog.id);
  };

  const handleDelete = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  if (!visible)
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>show</button>
      </div>
    );
  else
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username ? (
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>
        ) : null}
      </div>
    );
};

export default Blog;
