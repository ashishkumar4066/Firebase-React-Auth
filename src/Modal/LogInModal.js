import React, { Component } from "react";
import { auth } from "../config/firebase-config";
class LogInModal extends Component {
  state = {
    email: "",
    password: "",
  };
  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onLogIn(e) {
    e.preventDefault();
    let that = this;
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res.user);
        that.onResetUser();
      });
  }
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
          </div>
        </div>
      </div>
    );
  }
}
export default LogInModal;
