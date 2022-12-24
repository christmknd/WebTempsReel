import Nav from "../components/Nav";
import GestionSav from "../components/Admin/GestionSav";
import GestionChatroom from "../components/Admin/GestionChatRoom";

function Admin () {
    return (
        <div className="admin">
            <Nav />
            <h1>Admin : dashboard</h1>
            <GestionSav/>
            <GestionChatroom/>
        </div>
    )
}

export default Admin;