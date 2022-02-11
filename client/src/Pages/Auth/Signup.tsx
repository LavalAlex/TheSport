import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./CardLogin.module.css";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import { IUserRegister, IUserAuth } from "../../Interface/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { State } from "../../Redux/Reducer/Index";

export default function SignfavoriteUp() {
  const dispatch = useDispatch();
  const { signup,auth } = bindActionCreators(actionCreators, dispatch);
  const [user, setUser] = useState<IUserRegister>({ email: "", password: "" });
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
    console.log(user);
    e.preventDefault();
    signup(user);
    alert('Successfully Register ');
  };
  return session.email? (   <Navigate to="/home" />): (
    <main>
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <div id={styles.cardContent}>
            <div id={styles.cardTitle}>
              <h2>REGISTER</h2>
              <div className={styles.underlineTitle}></div>
            </div>
            <label className={styles.labelEmail}>Email</label>

            <div className="col-sm-10">
              <input
                id="user-email"
                className={styles.formContent}
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
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
            <label className={styles.labelPassword}>Confirm Password</label>

            <input
              id="user-password"
              className={styles.formContent}
              type="password"
              name="confirmPassword"
              required
            />
            <div className={styles.formBorder}></div>

            <button
              type="submit"
              className="btn btn-primary"
              id={styles.submitBtn}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
