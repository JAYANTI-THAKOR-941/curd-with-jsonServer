import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
    avatar: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000/users";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      try {
        await axios.put(`${API}/${editId}`, form);
        getUsers();
        alert("User updated.!!");
      } catch (error) {
        console.log("Faild to update user.!", error);
      }
    } else {
      try {
        await axios.post(`${API}`, form);
        getUsers();
        alert("User Added.!!");
      } catch (error) {
        console.log("Faild to update user.!", error);
      }
    }

    setForm({
      name: "",
      email: "",
      gender: "",
      city: "",
      avatar: "",
    });
    setEditId(null);
  };

  const handleEdit = (u) => {
    setForm({
      name: u.name,
      email: u.email,
      gender: u.gender,
      city: u.city,
      avatar: u.avatar,
    });
    setEditId(u.id);
  };

  const handleDelete = async(id)=>{
    await axios.delete(`${API}/${id}`)
    getUsers();
    alert('User deleted successfully.!!')
  }

  return (
    <div>
      <table>
        <tr>
          <th>Id</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>City</th>
          <th>Action</th>
        </tr>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>
              <img src={u.avatar} style={{ width: "60px" }} alt="" />
            </td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.gender}</td>
            <td>{u.city}</td>
            <td>
              <button onClick={() => handleEdit(u)}>Edit</button>
              <button onClick={()=>handleDelete(u.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={form.name}
          name="name"
          placeholder="Name"
        />
        <input
          type="text"
          onChange={handleChange}
          value={form.email}
          name="email"
          placeholder="Email"
        />
        <input
          type="text"
          onChange={handleChange}
          value={form.gender}
          name="gender"
          placeholder="Gender"
        />
        <input
          type="text"
          onChange={handleChange}
          value={form.city}
          name="city"
          placeholder="City"
        />
        <input
          type="text"
          onChange={handleChange}
          value={form.avatar}
          name="avatar"
          placeholder="Avatar"
        />
        <button>Add User</button>
      </form>
    </div>
  );
};

export default UserManagement;
