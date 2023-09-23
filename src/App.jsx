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

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    console.log(title, author, url);
    try {
      const data = await blogService.create({ title, url, author });
      setAuthor("");
      setTitle("");
      setUrl("");
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
          <BlogForm
            handleBlogCreate={handleBlogCreate}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </Togglable>
        <BlogList blogs={blogs} />
      </div>
    );
};

export default App;
