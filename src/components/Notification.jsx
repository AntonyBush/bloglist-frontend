const Notification = (props) => {
  let message = props.message;
  if (message === "") return null;
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message.includes("[ERROR]")) {
    messageStyle.color = "red";
    message = message.replace("[ERROR]", "");
  }
  return <div style={messageStyle}>{message}</div>;
};

export default Notification;
