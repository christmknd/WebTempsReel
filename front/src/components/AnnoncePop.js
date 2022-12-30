function AnnoncePop(props) {
  return (
    <div
      style={{
        background: "yellow",
        border: "solid",
        margin: "10px",
        padding: "10px",
      }}
    >
      <p>
        <strong>Annonce Spéciale</strong>
      </p>
      <p>{props.text}</p>
    </div>
  );
}

export default AnnoncePop;
