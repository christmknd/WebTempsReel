import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/home`}>Home</Link>
        </li>
        <li>
          <Link to={`/chatroom`}>ChatRoom</Link>
        </li>
        <li>
          <Link to={`/websocket`}>Test Websocket</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
