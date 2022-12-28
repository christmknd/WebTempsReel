import NavAdmin from "../../components/Nav/NavAdmin";
import { Outlet } from "react-router-dom";

function AdminApp() {
  return (
    <div className="AdminApp">
      <NavAdmin />
      <Outlet />
    </div>
  );
}

export default AdminApp;
