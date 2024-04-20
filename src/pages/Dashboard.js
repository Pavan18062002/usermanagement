import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList/UserList';
import UserForm from '../components/Userform/UserForm';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { getUsers, addUser, editUser, deleteUser } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const usersData = await getUsers();
      console.log('Users data:', usersData);
      setUsers(usersData);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = await addUser(formData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      });
      setIsNewUser(false);
    } catch (error) {
      setError('Error adding user');
    }
  };
  const handleEditUser = async () => {
    try {
      await editUser(selectedUser.id, formData);
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => {
          if (user.id === selectedUser.id) {
            return { ...user, ...formData };
          }
          return user;
        });
        return updatedUsers;
      });

      setSelectedUser(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      });
    } catch (error) {
      setError('Error editing user');
    }
  };


  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      setError('Error deleting user');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsNewUser(false);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
    });
  };

  const handleAddClick = () => {
    setIsNewUser(true);
    setSelectedUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
  };

  return (
    <div className="dashboard-container">
      <h1>User Management Dashboard</h1>
      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <button className='add' onClick={handleAddClick}>Add User</button>
          <UserList users={users} handleEditClick={handleEditClick} handleDeleteUser={handleDeleteUser} />
          {(isNewUser || selectedUser) && (
            <UserForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={isNewUser ? handleAddUser : handleEditUser}
              isNewUser={isNewUser}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
