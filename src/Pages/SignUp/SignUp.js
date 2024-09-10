import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Container,Row } from 'react-bootstrap';
import Headerlogo from '../../Elements/headerlogo';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, settLastName] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showInfo, setShowInfo] = useState({ email: false, password: false });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const usernamePattern=/^(?=[A-Za-z]*[0-9]*[A-Za-z])[A-Za-z0-9]{2,}$/;

  const validateEmail = (email) => {
    return emailPattern.test(email) ? '' : '  ';
  };

  const validatePassword = (password) => {
    return passwordPattern.test(password) ? '' : ' ';
  };

  const validateFirstName =(firstName)=>{
    return usernamePattern.test(firstName) ? '' : '  ';
  }
  const validateLastName =(lastName)=>{
    return usernamePattern.test(lastName) ? '' : '  ';
  }

  const validateConfirmPassword = (confirmPassword) => {
    return (passwordPattern.test(confirmPassword))&&(confirmPassword===password) ? '' : ' ';
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

  
  const handleconfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    if (submitted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: validateConfirmPassword(newPassword),
      }));
    }
  };

  const handlefirstNameChange = (e) => {
    const newUserName = e.target.value;
    setFirstName(newUserName);
    if (submitted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: validateFirstName(newUserName),
      }));
    }
  };

  const handleLastNameChange = (e) => {
    const newUserName = e.target.value;
    settLastName(newUserName);
    if (submitted) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: validateLastName(newUserName),
      }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const emailError = validateEmail(email);
    const firstNameError = validateFirstName(firstName);
    const lastNameError =settLastName(lastName);
    const passwordError = validatePassword(password);
    const ConfirmpasswordError = validatePassword(confirmPassword);
    setErrors({
      email: emailError,
      firstName:firstNameError,
      lastName:lastNameError,
      password: passwordError,
      confirmPassword:ConfirmpasswordError
    });
    if (!emailError && !passwordError&&!ConfirmpasswordError&&!firstNameError&&!lastNameError) {


      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);


      const userCredentials = {
        email: email,
        password: password,
        firstName:firstName,
        lastName:lastName
      };
  
      fetch("https://localhost:7065/api/User/signUp", {
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
          navigate('/Login'); // Navigate to the homepage
        })
        .catch(error => {
          console.error("Error:", error);
          setErrorMessage('Invalid email or password.');
        });
  
  
      
    };


    }

   


  const toggleInfo = (field) => {
    setShowInfo((prevShowInfo) => ({
      ...prevShowInfo,
      [field]: !prevShowInfo[field],
    }));
  };

  return (
 <>
  <Container fluid>
  <Row xs={12} md={6} className="justify-content-center">
  
   <Container className="login-container">
   {/* <div className='top-container'>
 <div className='back-drop'>

 </div>
<div className='header-container'>


</div>

 </div>*/}
 <Headerlogo></Headerlogo>
      
      <form  className='FormContainer' onSubmit={handleSubmit}>

       {/*User name field */}
      <div className='input-container'>
        <input
              className={`loginInput ${submitted && errors.firstName ? 'input-error' : ''}`}
              type="text"
              id="firsName"
              placeholder="first Name"
              value={firstName}
              onChange={handlefirstNameChange}
              required
            />
             <button
              type="button"
              className={`info-button ${showInfo.firstName ? 'active' : ''}`}
              onMouseLeave={() => toggleInfo('firstName')}
              onMouseEnter={() => toggleInfo('firstName')}
              
            >i</button>
             {showInfo.userName && <span className="info-text">User name contain only latin latters and numbers
            </span>}
             {submitted && errors.userName && <p className="error">{errors.userName}</p>}

          
          </div>
           
          <div className='input-container'>
        <input
              className={`loginInput ${submitted && errors.lastName ? 'input-error' : ''}`}
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
             <button
              type="button"
              className={`info-button ${showInfo.lastName ? 'active' : ''}`}
              onMouseLeave={() => toggleInfo('lastName')}
              onMouseEnter={() => toggleInfo('lastName')}
              
            >i</button>
             {showInfo.lastName && <span className="info-text">User name contain only latin latters and numbers
            </span>}
             {submitted && errors.lastName && <p className="error">{errors.lastName}</p>}

          
          </div>


         {/*email  field */} 
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
              
            >i</button>
             {showInfo.email && <span className="info-text">Email must be in a valid format (e.g., user@example.com).</span>}
             {submitted && errors.email && <p className="error">{errors.email}</p>}

          
          </div>
         {/*password  field */} 
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
           
            {showInfo.password && <span className="info-text">
              Password must be at least 8 characters long, contain at least one uppercase letter,
              one number, and one special character.
            </span>}
            {submitted && errors.password && <p className="error">{errors.password}</p>}




          </div>
          {/* confirm password  field */} 

          <div className='input-container'>
          <input
              className={`loginInput ${submitted && errors.confirmPassword ? 'input-error' : ''}`}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm-Password"
              onChange={handleconfirmPasswordChange}
              required
            />
          <button
              type="button"
              className={`info-button ${showInfo.confirmPassword ? 'active' : ''}`}
              onMouseLeave={() => toggleInfo('confirmPassword')}
              onMouseEnter={() => toggleInfo('confirmPassword')}
            >
              i
            </button>
           
            {showInfo.confirmPassword && <span className="info-text">
              Password must be at least 8 characters long, contain at least one uppercase letter,
              one number, and one special character.
            </span>}
            {submitted && errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}




          </div>
         


          <p className='lineText'>
            Forget your password?
          </p>
        <button className='submitForm' type="submit">Signup</button>
      </form>
          <p style={{padding :"40px"}} className='lineText'>     
         Don't have an account?{" "}
          <Link className='boldLine' to="/">Login</Link>
         </p>
    </Container>

     </Row>
    </Container>
    </>

  );
}
