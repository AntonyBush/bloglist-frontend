import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState("");
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(`[ERROR] ${error.response.data.error}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (blogObject) => {
    try {
      const data = await blogService.create(blogObject);
      setBlogs(blogs.concat(data));
      setMessage(`a new blog ${data.title}, by ${data.author} added`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setMessage(`[ERROR] ${error.response.data.error}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const updateBlog = async (data, id) => {
    try {
      const response = await blogService.update(data, id);
      const newBlogs = blogs.map((blog) =>
        blog.id === response.id ? response : blog
      );
      setBlogs(newBlogs);
    } catch (error) {
      setMessage(`[ERROR] ${error.response.data.error}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setMessage(`[ERROR] ${error.response.data.error}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };
  blogs.sort((a, b) => b.likes - a.likes);

  if (user === null)
    return (
      <>
        <Notification message={message} />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  else
    return (
      <div>
        <Notification message={message} />
        <h2>blogs</h2>
        <p>
          {user.name} logged in{" "}
          <button type="button" onClick={handleLogout}>
            log out
          </button>
        </p>
        <Togglable label="create blog">
          <h2>create new</h2>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      </div>
    );
};

export default App;
