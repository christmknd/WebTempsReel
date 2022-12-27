import { useEffect } from "react";

const Login = () => {
  const login = async () => {
    const url = process.env.REACT_APP_API_BACK + ":8001/users/login";
    // const url = process.env.REACT_APP_API_BACK + ":8001/message";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "firstuser",
        password: "firstuser",
        // firstname: "first",
        // lastname: "user",
      }),
    });
    // console.log("response", response);

    const data = await response.json();

    console.log("login data", data);
  };

  useEffect(() => {
    login();
  }, []);

  const Login = () => {
    return (
      <div>
        <h1>Login</h1>
      </div>
    );
  };
};

export default Login;
