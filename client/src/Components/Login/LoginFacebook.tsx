import React, { FormEvent } from "react";
import { bindActionCreators } from "redux";
import styles from "./CardLogin.module.css";
import { actionCreators } from "../../Redux";
import { useDispatch } from "react-redux";

export default function LoginFacebook() {
    const dispatch = useDispatch();
    const {loginFacebook} = bindActionCreators(actionCreators, dispatch)
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        loginFacebook()
    }

    return (
    <div className="App">
      <button
        type="submit"
        className="btn btn-primary"
        id={styles.submitBtn}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Login with Facebook
      </button>
    </div>
  );
}
