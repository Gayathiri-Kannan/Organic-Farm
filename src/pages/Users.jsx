import { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/users');
    console.log('API response:', res.data);
    setUsers(res.data);
    if (res.data.length === 0) {
      setError('No users in the database.');
    } else {
      setError('');
    }
  } catch (err) {
    console.error('Error fetching users:', err.message);
    setError('Unable to fetch users.');
  }
};


  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Unable to delete user.');
    }
  };

  return (
    <div className="users-container">
      <div className="container mt-5">
        <h2 className="mb-4">Registered Users</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || user.id || index}>
                  <td>{index + 1}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user._id || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                      disabled={!user._id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;
