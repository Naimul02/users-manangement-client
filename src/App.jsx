import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };
    console.log(user);

    // fetch kora mane amra ekta particular url a jabo.
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        //eta deyar karon hocche ki type er data jabe backend a seta bole deya.
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("inside post response", data);
        const newUsers = [...users , data];
        setUsers(newUsers);
        form.reset();
      });
  };
  return (
    <>
      <h1>Users Management System</h1>
      <h3>Numbers of Users : {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id} {user.name} {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
