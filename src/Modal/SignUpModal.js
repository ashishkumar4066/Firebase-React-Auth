import React, { Component } from "react";
import { auth, firestore } from "../config/firebase-config";
class SignUpModal extends Component {
  state = {
    email: "",
    password: "",
    bio: "",
  };

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSignUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        firestore
          .collection("users")
          .doc(res.user.uid)
          .set({ bio: this.state.bio });
        // const modal = document.querySelector("#modal-signup");
        // console.log(modal);
        // M.Modal.getInstance(modal).close();
      });
  }
  render() {
    return (
      <div>
        <div id="modal-signup" className="modal">
          <div className="modal-content">
            <h4>Sign up</h4>
            <br />
            <form id="signup-form" onSubmit={(e) => this.onSignUp(e)}>
              <div className="input-field">
                <input
                  type="email"
                  id="signup-email"
                  required
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.onChangeHandler(e)}
                />
                <label htmlFor="signup-email">Email address</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  id="signup-password"
                  required
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.onChangeHandler(e)}
                />
                <label htmlFor="signup-password">Choose password</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  id="bio-password"
                  required
                  name="bio"
                  value={this.state.bio}
                  onChange={(e) => this.onChangeHandler(e)}
                />
                <label htmlFor="bio-password">Bio</label>
              </div>
              <button type="submit" className="btn yellow darken-2 z-depth-0">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUpModal;
