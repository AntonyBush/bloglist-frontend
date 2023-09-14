const BlogForm = (props) => {
  return (
    <form onSubmit={props.handleBlogCreate}>
      <div>
        title
        <input
          type="text"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={props.author}
          onChange={(e) => props.setAuthor(e.target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={props.url}
          onChange={(e) => props.setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
