import { useState } from "react";

function AnnonceCommercial() {
  const [text, setText] = useState("");

  function handleChangeText(e) {
    setText(e.target.value);
  }

  function handleSubmitText(e) {
    e.preventDefault();
    setText("");
    sendText(text);
  }

  function sendText(data) {
    fetch(
      `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/annonce-commerciale`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );
  }

  return (
    <div className="AnnonceCommercial">
      <h1>Annonce Commerciale</h1>
      <form onSubmit={handleSubmitText}>
        <label id="text">
          <input
            type="text"
            placeholder="Write a message"
            style={{ width: "100%" }}
            value={text}
            onChange={handleChangeText}
          />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default AnnonceCommercial;
