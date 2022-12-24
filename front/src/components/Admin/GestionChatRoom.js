import { useEffect, useRef, useState } from "react";

function GestionChatroom () {

    const chatroomName = useRef();
    const [chatrooms,setChatrooms] = useState([]);

    //quand le chatroom seront persisantes en back
    // verifie que le salon n'existe pas
    /* 
    useEffect(() => {
        
    }, [])
    */
    function addChatroom(event){
        event.preventDefault();
        const next = [...chatrooms, chatroomName.current.value];
        setChatrooms(next);
    }

    function deleteChatroom() {

    }

    return (
        <div className="gestionChatroom">
            <h2>Gestion des chatrooms</h2>
            <div className="gestionZone">

            <form onSubmit={addChatroom}>
                <input ref={chatroomName}/>
                <input type="submit" value="Add ChatRoom" />
            </form>

            <ul>
                {chatrooms.map(chatroom => 
                    <li className="chatroom" key={chatroom}> <p>{chatroom}</p> 
                    <button onClick={deleteChatroom}>Supprimer Chatroom</button>
                    </li>
                )}
            </ul>

                
            </div>
        </div>
    )
}

export default GestionChatroom;