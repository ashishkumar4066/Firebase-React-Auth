import React from "react";
import Logo from "../img/logo.svg";
import { auth } from "../config/firebase-config";
const NavBar = ({ menu }) => {
  const onSignOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("sign out");
    });
  };
  return (
    <div>
      <nav className="z-depth-0 grey lighten-4">
        <div className="nav-wrapper container">
          <a href="/" className="brand-logo">
            <img
              alt="Brand"
              src={Logo}
              style={{ width: "180px", marginTop: "10px" }}
            />
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {menu ? (
              <div>
                <li className="logged-in">
                  <a
                    href="/"
                    className="grey-text modal-trigger"
                    data-target="modal-account"
                  >
                    Account
                  </a>
                </li>
                <li className="logged-in">
                  <a
                    href="/"
                    className="grey-text"
                    id="logout"
                    onClick={onSignOut}
                  >
                    Logout
                  </a>
                </li>
                <li className="logged-in">
                  <a
                    href="/"
                    className="grey-text modal-trigger"
                    data-target="modal-create"
                  >
                    Create Guide
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li className="logged-out">
                  <a
                    href="/"
                    className="grey-text modal-trigger"
                    data-target="modal-login"
                  >
                    Login
                  </a>
                </li>
                <li className="logged-out">
                  <a
                    href="/"
                    className="grey-text modal-trigger"
                    data-target="modal-signup"
                  >
                    Sign up
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
