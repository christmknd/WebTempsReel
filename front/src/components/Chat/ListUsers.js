import React, { useState, useEffect } from "react";

function ListUsers(props) {
  //   const [users, setUsers] = useState([]);

  //   useEffect(() => {
  //     const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/users`;
  //     fetch(urlHttp)
  //       .then((response) => response.json())
  //       .then((data) => setUsers(data.message))
  //       .catch((error) => console.error(error));
  //   }, []);

  const users = [
    {
      name: "toto",
      id: 1,
    },
    {
      name: "tata",
      id: 2,
    },
    {
      name: "titi",
      id: 3,
    },
  ];

  return (
    <ul style={{ listStyle: "none" }}>
      {users.map((el) => (
        <div
          style={{ border: "solid", height: "50px", width: "100px" }}
          onClick={(e) => props.selectUser(el.id, e)}
          key={el.id}
        >
          <li>
            {el.id} - {el.name}
          </li>
        </div>
      ))}
    </ul>
  );
}

export default ListUsers;
