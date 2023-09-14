const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            onChange={(e) => props.setUsername(e.target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
