import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const url = process.env.REACT_APP_API_BACK + ":8001/users/login";
    // const url = process.env.REACT_APP_API_BACK + ":8001/message";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    // console.log("response", response);

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("username", data.username);
    }

    // redirecting the user to the home page
    window.location.href = "/";

    console.log("login data", data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "400px",
          // height: "300px",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 0 10px #ccc",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            margin: "20px",
          }}
        >
          Login
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              margin: "10px",
              width: "300px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              margin: "10px",
              width: "300px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>
        <button
          onClick={login}
          style={{
            padding: "10px",
            margin: "10px",
            width: "300px",
            fontSize: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            outline: "none",
            cursor: "pointer",
            color: "#FFF",
            background: "#4584F0",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
