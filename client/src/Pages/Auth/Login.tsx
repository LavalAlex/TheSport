import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserAuth, IUserLogin } from "../../Interface/Interfaces";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import { State } from "../../Redux/Reducer/Index";
import { Navigate } from "react-router";

import styles from "./CardLogin.module.css";

import LoginGoogle from "../../Components/Login/LoginGoogle";
import LoginFacebook from "../../Components/Login/LoginFacebook";

export default function Login() {
  const dispatch = useDispatch();
  const { login, auth } = bindActionCreators(actionCreators, dispatch);
  const [user, setUser] = useState<IUserLogin>({ email: "", password: "" });
  const session:IUserAuth = useSelector((state:State) => state.session)
  
  useEffect(()=>{
    auth()
  },[])

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUser((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(user);
  };
  return session.email? (   <Navigate to="/home" />): (
    <main>
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div id={styles.cardContent}>
            <div id={styles.cardTitle}>
              <h2>LOGIN</h2>
              <div className={styles.underlineTitle}></div>
            </div>
            <label className={styles.labelEmail}>Email</label>
            <input
              type="email"
              className={styles.formContent}
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <div className={styles.formBorder}></div>
            <label className={styles.labelPassword}>Password</label>
            <input
              id="user-password"
              className={styles.formContent}
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <div className={styles.formBorder}></div>
            <a href="#">
              <legend className={styles.forgotPass}>Forgot password?</legend>
            </a>
            <button type="submit" id={styles.submitBtn}>
              Login
            </button>
            <LoginGoogle/>
            <LoginFacebook/>
          </div>
        </div>
      </form>
    </main>
  );
}
