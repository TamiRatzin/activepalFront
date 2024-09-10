import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Headerlogo from '../../Elements/headerlogo';
import { useUserContext } from '../../Elements/UserContext'; // Adjust the path as necessary

export default function Login({ users }) {
  const navigate = useNavigate();
  const { setUserId } = useUserContext(); // Access the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showInfo, setShowInfo] = useState({ email: false, password: false });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validateEmail = (email) => {
    return emailPattern.test(email) ? '' : 'Invalid email address';
  };

  const validatePassword = (password) => {
    return passwordPattern.test(password) ? '' : 'Invalid password';
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (submitted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(newEmail),
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (submitted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(newPassword),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({
      email: emailError,
      password: passwordError,
    });
    if (!emailError && !passwordError) {
      // Handle login logic here
      const userCredentials = {
        email: email,
        password: password
      };

      fetch("https://localhost:7065/api/User/login", {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Login failed');
          }
        })
        .then(result => {
          console.log("Login successful: ", result);
          setUserId(result); 
          localStorage.setItem('userId', result);// Save the userId in context
          navigate('/homepage'); // Navigate to the homepage
        })
        .catch(error => {
          console.error("Error:", error);
          setErrorMessage('Invalid email or password.');
        });
    }
  };

  const toggleInfo = (field) => {
    setShowInfo((prevShowInfo) => ({
      ...prevShowInfo,
      [field]: !prevShowInfo[field],
    }));
  };

  return (
    <Container fluid>
      <Row xs={12} md={6} className="justify-content-center flex-grow-1">
        <Container xs={12} fluid className="login-container">
          <Headerlogo></Headerlogo>
          <form className='FormContainer' onSubmit={handleSubmit}>
            <div className='input-container'>
              <input
                className={`loginInput ${submitted && errors.email ? 'input-error' : ''}`}
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button
                type="button"
                className={`info-button ${showInfo.email ? 'active' : ''}`}
                onMouseLeave={() => toggleInfo('email')}
                onMouseEnter={() => toggleInfo('email')}
              >
                i
              </button>
              {showInfo.email && <span className="info-text">Email must be in a valid format (e.g., user@example.com).</span>}
              {submitted && errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className='input-container'>
              <input
                className={`loginInput ${submitted && errors.password ? 'input-error' : ''}`}
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className={`info-button ${showInfo.password ? 'active' : ''}`}
                onMouseLeave={() => toggleInfo('password')}
                onMouseEnter={() => toggleInfo('password')}
              >
                i
              </button>
              {showInfo.password && <span className="info-text">Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.</span>}
              {submitted && errors.password && <p className="error">{errors.password}</p>}
            </div>
            <p className='lineText'>Forget your password?</p>
            <button className='submitForm' type="submit">Login</button>
            <p style={{ padding: "40px" }} className='lineText'>
              Don't have an account?{" "}
              <Link className='boldLine' to="/SignUp"> SignUp</Link>
            </p>
          </form>
        </Container>
      </Row>
    </Container>
  );
}

