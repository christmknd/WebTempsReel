import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    const url = process.env.REACT_APP_API_BACK + ":8001/users/signup";
    // const url = process.env.REACT_APP_API_BACK + ":8001/message";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
      }),
    });

    const responseData = await response.json();
    if (responseData.token) {
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.user_id);
      localStorage.setItem("role", responseData.role);
      localStorage.setItem("username", responseData.username);
      window.location.href = "/";
    }

    if (response.status !== 200) {
      if (responseData.message) setError(responseData.message);
      else setError("Somthing when wrong");
    }
    console.log("Signup data", responseData);
  };

  useEffect(() => {
    // signup();
  }, []);

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
          // width: "400px",
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
          Sign up
        </h1>
        <div
          style={{
            // grid
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "20px",
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "20px",
              margin: "10px",
              width: "300px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <input
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            style={{
              padding: "20px",
              margin: "10px",
              width: "300px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          <input
            type="text"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            style={{
              padding: "20px",
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
          onClick={signup}
          style={{
            padding: "20px",
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
          Sign up
        </button>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          you have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#4584F0",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Login
          </Link>
        </div>
      </div>
      <div
        style={{
          marginTop: "15px",
          color: "red",
          height: "20px",
        }}
      >
        {error}
      </div>
    </div>
  );
};

export default Signup;
