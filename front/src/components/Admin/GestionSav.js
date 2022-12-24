import { useState } from "react";

function GestionSav (){
    const [status, setStatus] = useState('indisponible');

    function changeStatus () {
        if(status === 'indisponible') {
            setStatus('disponible')
        } else
            setStatus('indisponible')
    }

    return (
        <div className="communication">
            <div className="statusConseiller">
            <h4>Statut</h4>
            <p><span>{status}</span></p> 
            <button onClick={changeStatus}>Change status</button>
            </div>
            <div className="Conversation">
            </div>

        </div>
    )
}

export default GestionSav;