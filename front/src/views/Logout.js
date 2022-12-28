const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");

  window.location.href = "/login";

  return <div></div>;
};

export default Logout;
