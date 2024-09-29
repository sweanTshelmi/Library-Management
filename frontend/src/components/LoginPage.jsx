import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Sample user credentials
    const sampleUser = {
      username: 'admin',
      password: 'admin'
    };

    // Check if entered credentials match the sample user
    if (username === sampleUser.username && password === sampleUser.password) {
      navigate('/dashboard'); // Navigate to the Dashboard page
    } else {
      alert('Invalid credentials'); // Show an error if credentials are incorrect
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
          <label htmlFor="Username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <label htmlFor="Password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
