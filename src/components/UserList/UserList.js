import React from 'react';
import './UserList.css';

const UserList = ({ users, handleEditClick, handleDeleteUser }) => {
  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const [firstName, lastName] = user.name.split(' '); 
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName}</td> 
                <td>{lastName}</td> 
                <td>{user.email}</td>
                <td>{user.address.city}</td> 
                <td>
                  <button className="edit-button" onClick={() => handleEditClick(user)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
