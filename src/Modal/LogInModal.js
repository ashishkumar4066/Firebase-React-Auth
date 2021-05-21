import React, { Component } from "react";
import { auth } from "../config/firebase-config";
import firebase from "firebase";

class LogInModal extends Component {
  state = {
    email: "",
    password: "",
    phoneNo: "",
    showPhone: true,
    selectPhone: "Phone Number",
  };

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSelectPhone = () => {
    this.setState({ showPhone: !this.state.showPhone });
    if (this.state.showPhone) {
      this.setState({ selectPhone: "Email" });
    } else {
      this.setState({ selectPhone: "Phone Number" });
    }
  };
  onLogIn(e) {
    e.preventDefault();
    // ---- CSS Part not required----

    // const modal = document.querySelector("#modal-login");
    // const className = modal.classList;
    // className.remove("open");
    // className.add("close");
    // modal.classList = className;
    // modal.style.display = "none";
    // modal.style.opacity = "0";
    // modal.style.top = "4%";
    // modal.style.transform = "scaleX(0.8) scaleY(0.8)";
    // const overlay = document.querySelector("div.modal-overlay");
    // console.log(overlay.style);
    // overlay.style.opacity = "0";
    // overlay.style.display = "none";

    // ----------------------------------

    let that = this;
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res.user);
        that.onResetUser();
      });
  }
  onLogInPhone = (e) => {
    e.preventDefault();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("recature resolved");
        },
      }
    );

    auth
      .signInWithPhoneNumber(this.state.phoneNo, window.recaptchaVerifier)
      .then((res) => {
        console.log(res);
        let otp = prompt("Enter OTP", "");
        if (otp === null) return;
        res.confirm(otp).then((response) => {
          console.log(response.user);
        });
      });
  };
  onResetUser() {
    this.setState({ email: "", password: "" });
  }
  render() {
    return (
      <div>
        <div id="modal-login" className="modal">
          <div className="modal-content">
            <h4>Login</h4>
            <br />
            {this.state.showPhone ? (
              <form
                id="login-form"
                onSubmit={(e) => {
                  this.onLogIn(e);
                }}
              >
                <div className="input-field">
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.onChangeHandler(e);
                    }}
                    required
                  />
                  <label htmlFor="login-email">Email address</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => {
                      this.onChangeHandler(e);
                    }}
                    required
                  />
                  <label htmlFor="login-password">Your password</label>
                </div>
                <button className="btn yellow darken-2 z-depth-0">Login</button>
              </form>
            ) : (
              <form
                id="login-form-phoneNo"
                onSubmit={(e) => {
                  this.onLogInPhone(e);
                }}
              >
                <div className="input-field">
                  <input
                    type="text"
                    id="login-phone"
                    name="phoneNo"
                    value={this.state.phoneNo}
                    onChange={(e) => {
                      this.onChangeHandler(e);
                    }}
                    required
                  />
                  <label htmlFor="login-Phone">Your Phone Number</label>
                </div>
                <div id="recaptcha-container"></div>
                <button className="btn yellow darken-2 z-depth-0">Login</button>
              </form>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              or login with
              <span
                onClick={this.onSelectPhone}
                style={{
                  cursor: "pointer",
                  marginLeft: "3px",
                  color: "#039be5",
                }}
              >
                {this.state.selectPhone}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LogInModal;
