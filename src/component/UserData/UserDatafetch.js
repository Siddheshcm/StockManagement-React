import { useEffect, useState } from "react";
import UserData from "./UserDetailsData";

const API = "https://jsonplaceholder.typicode.com/users";

const UserDatafetch = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setUsers(data);
      }
      console.log("User");
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <UserData users={users}></UserData>
        </tbody>
      </table>
    </>
  );
};

export default UserDatafetch;
