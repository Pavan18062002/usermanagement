import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ formData, handleChange, handleSubmit, isNewUser }) => {
  const [errors, setErrors] = useState({});




  const validateForm = () => {
    let errors = {};
    if (!formData.firstName || !formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName || !formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    if (!formData.email || !formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.department || !formData.department.trim()) {
      errors.department = 'Department is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(formData);
    }
  };


  return (
    <div className="user-form-container">
      <h2>{isNewUser ? 'Add User' : 'Edit User'}</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <button className='button' type="submit">{isNewUser ? 'Add' : 'Save'}</button>
      </form>
    </div>
  );
};

export default UserForm;
