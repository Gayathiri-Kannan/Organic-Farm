import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [emailExists, setEmailExists] = useState(true);
  const [emailChecked, setEmailChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = storedUsers.find(
      user => user.email === email && user.password === password
    );

    setEmailChecked(true);
    setEmailExists(!!matchedUser);

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      alert('Login successful!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header"><h3>Login</h3></div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" required />
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div className="login-buttons mt-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/register" className="btn btn-success">Register</Link>
                  </div>
                </form>

                {emailChecked && !emailExists && (
                  <p className="mt-3 text-danger text-center">
                    Email not found or password incorrect. Please try again or register.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
