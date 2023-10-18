import React, { useEffect, useRef, useState } from "react";
import "./CSS/LoginSignup.css";

const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginSignup = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("*");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setvalidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [checkBox, setCheckbox] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setvalidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleCheckBox = () => {
    setCheckbox(!checkBox);
    console.log(checkBox);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //prevent JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    console.log(user, pwd);
    setSuccess(true);
    console.log(success);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <label htmlFor="name">Your Name:</label>
            <input
              autoComplete="off"
              ref={userRef}
              type="text"
              placeholder="Your Name"
            ></input>

            <label htmlFor="username">Email:</label>
            <span className={validName ? "valid" : "hide"}>OK</span>
            <span className={validName || !user ? "hide" : "invalid"}>X</span>
            <input
              type="email"
              id="username"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder="Email Address"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              i Must be a valid email
            </p>

            <label htmlFor="password">Password:</label>
            <span className={validPwd ? "valid" : "hide"}>OK</span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>X</span>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Email Address"
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              i 8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: !@#$%^&*
            </p>

            <label htmlFor="confirm_pwd">Password:</label>
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
              OK
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
              X
            </span>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="Email Address"
            />
            <p
              id="pwdnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              i
              <br />
              Must match the first password.
            </p>
          </div>
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              required
              name=""
              id=""
              onChange={handleCheckBox}
            ></input>
            <p>By continuing I agree to terms of use & privacy policy.</p>
          </div>
          <button
            disabled={
              !validName || !validPwd || !validMatch || !checkBox ? true : false
            }
          >
            Sign up
          </button>
        </form>
        <p className="loginsignup-login">
          Already have an account? <span>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
