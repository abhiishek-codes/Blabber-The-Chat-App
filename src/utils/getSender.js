const getSender = (users) => {
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUser = data.name;

  const sender = loggedInUser == users[0].name ? users[1].name : users[0].name;
  return sender;
};

export default getSender;
