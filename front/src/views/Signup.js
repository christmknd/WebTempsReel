import { useEffect, useState } from "react";

const Signup = () => {
  const [data, setData] = useState({});

  const signup = async () => {
    const url = process.env.REACT_APP_API_BACK + ":8001/users/signup";
    // const url = process.env.REACT_APP_API_BACK + ":8001/message";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "user4",
        password: "user4",
        firstname: "fourth",
        lastname: "user",
      }),
    });
    // console.log("response", response);

    const responseData = await response.json();

    setData(responseData);

    console.log("Signup data", data);
  };

  useEffect(() => {
    signup();
  }, []);

  return (
    <div>
      <h1>Signup</h1>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export default Signup;
