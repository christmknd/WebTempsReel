import Nav from "../components/Nav";

import ChatBot from "../components/ChatBot/ChatBot";
import Sav from "../components/Sav";

function ServiceClient() {
  return (
    <div className="ServiceClient">
      <Nav />
      <h1>Service Client</h1>
      <Sav />
      <ChatBot />
    </div>
  );
}

export default ServiceClient;
