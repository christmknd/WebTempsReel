import { Link } from "react-router-dom";

function NavAdmin() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="sav-admin">Service Client</Link>
        </li>
        <li>
          <Link to="logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavAdmin;
