import { Link } from "react-router-dom";

function NavUser() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="service-client">Service Client</Link>
        </li>
        <li>
          <Link to="private-chat">Private Chat</Link>
        </li>
        <li>
          <Link to="chatroom">Chat Rooms</Link>
        </li>
        <li>
          <Link to="logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavUser;
