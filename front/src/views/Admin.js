import Nav from "../components/Nav";
import GestionSav from "../components/Admin/GestionSav";

function Admin () {
    return (
        <div className="admin">
            <Nav />
            <h1>Admin : dashboard</h1>
            <GestionSav/>
        </div>
    )
}

export default Admin;