import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../utils/constants";

function AllUsers() {
  const [users, setUsers] = useState([]);

  async function getData() {
    const res = await axios.get(baseUrl + "/user/getUsers");
    setUsers(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>List of users</h2>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.fname} {user.lname}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllUsers;
