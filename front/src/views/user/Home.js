import { useEffect } from "react";

function Home() {
  const loadData = async () => {
    const url = process.env.REACT_APP_API_BACK + ":8001/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzIxNDM0ODd9.e0nCjIc30BJF6p7lPFIujBiGlGGLl28u0tE-yEsmNpo",
        // localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log("login data", data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="Home">
      <h1>Home</h1>
    </div>
  );
}

export default Home;
