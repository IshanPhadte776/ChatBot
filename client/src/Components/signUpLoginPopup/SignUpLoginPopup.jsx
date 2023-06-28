import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { FaTimes } from "react-icons/fa";

import logo from "./logo.png";
import axios from 'axios';

function SignUpLoginPopup() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [showPopup, setShowPopup] = useState(true);

  const [teachers, setTeachers] = useState([]);

  const [loggedIn, setloggedIn] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3001/teachers");

      console.log(result)
      setTeachers(Object.values(result.data)[0]);
    };
    fetchData();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    //prevents the reload of the page
    e.preventDefault();

    teachers.forEach(function (element) {
      if (element.Email === emailValue && element.Password === passwordValue) {
        setloggedIn(true);
      } else {
      }
    });

    if (loggedIn) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  return (
    <>
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popUp}>
            <div className={styles.row}>
              <img className={styles.logoImage} src={logo} alt="Logo" />
              <button className={styles.closePopup} onClick={handleClosePopup}>
                <FaTimes />
              </button>
            </div>
            <h2 className={styles.subHeading}>Education. Learning. Fun.</h2>

            <h2 className={styles.subHeading}>
              Provide your email and password to login
            </h2>

            <form className={styles.emailForm} onSubmit={handleSubmit}>
              <label>
                <input
                  className={styles.input}
                  type="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="Email"
                />
              </label>

              <label>
                <input
                  className={styles.input}
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  autoComplete="password"
                  placeholder="Password"
                />
              </label>

              <button className={styles.input} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpLoginPopup;
