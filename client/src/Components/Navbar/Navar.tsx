import React, { useState } from "react";

export default function Navbar() {
 

  return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            The Sport
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="favorite">
                    Favorite
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="profile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="login">
                    LogOut
                  </a>
                </li>
              </ul>
        
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    SignUp
                  </a>
                </li>
              </ul>
          </div>
        </div>
      </nav>
 
  );
}
