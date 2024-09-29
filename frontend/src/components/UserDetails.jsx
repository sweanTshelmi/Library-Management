import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', membershipType: '', fines: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from backend on component mount
    axios.get('http://localhost:8080/api/v1/user/getUsers')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled before submission
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.membershipType) {
      alert("Please fill out all fields");
      return;
    }

    axios.post('http://localhost:8080/api/v1/user/addUser', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        // Clear the form
        setNewUser({ firstName: '', lastName: '', email: '', membershipType: '', fines: '' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  // Updating an existing user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      axios.put(`http://localhost:8080/api/v1/user/updateUser/${editingUser}`, newUser)
        .then(response => {
          // Update the user in the list
          setUsers(users.map(user => (user.id === editingUser ? response.data : user)));
          // Reset the form and editing state
          setNewUser({ firstName: '', lastName: '', email: '', membershipType: '', fines: '' });
          setEditingUser(null);
        })
        .catch(error => console.error('Error updating user:', error));
    }
  };

  // Preparing to edit an existing user
  const handleEditUser = (user) => {
    // Set the current user data in the form for editing
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      membershipType: user.membershipType,
      fines: user.fines
    });
    setEditingUser(user.id); // Set the user being edited
  };

  // Deleting a user
  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/v1/user/delete/${id}`)
      .then(() => {
        // Remove the user from the list
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="mb-4">
      <h2>User Details</h2>
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="mb-3">
        
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="membershipType" className="form-label">Membership Type</label>
          <input
            type="text"
            className="form-control"
            id="membershipType"
            value={newUser.membershipType}
            onChange={(e) => setNewUser({ ...newUser, membershipType: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fines" className="form-label">Fines</label>
          <input
            type="number"
            className="form-control"
            id="fines"
            value={newUser.fines}
            onChange={(e) => setNewUser({ ...newUser, fines: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Membership Type</th>
            <th>Fines</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.membershipType}</td>
              <td>{user.fines}</td>
              <td>
                <button onClick={() => handleEditUser(user)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
