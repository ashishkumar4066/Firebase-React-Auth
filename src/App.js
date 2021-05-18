import React, { Component } from "react";
import { auth, firestore } from "./config/firebase-config";

import GuideList from "./GuideList/GuideList";
import AccountDetailsModal from "./Modal/AccountDetailsModal";
import CreateGuideModal from "./Modal/CreateGuideModal";
import LogInModal from "./Modal/LogInModal";
import SignUpModal from "./Modal/SignUpModal";
import NavBar from "./NavBar/NavBar";

//Issue
// 1. Onload of page,for a sec login nav button is diplayed which should not be getting displayed when user is logged in.
// 2. While signing up the modal should be closed immediately after signing up.

class App extends Component {
  state = {
    email: "",
    bio: "",
    guide: [],
    hideMenu: false,
  };
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchData();
        this.fetchUserDetails(user);
        this.setState({ hideMenu: true });
      } else {
        this.setState({ guide: [] });
        this.setState({ email: "", bio: "" });
        this.setState({ hideMenu: false });
      }
    });
  }
  fetchData = () => {
    let fetchGuide = [];
    let aGuide = [];
    firestore
      .collection("guides")
      .get()
      .then((guides) => {
        guides.forEach((guide) => {
          fetchGuide.push(guide.data());
        });

        for (let key in fetchGuide) {
          aGuide.push({ ...fetchGuide[key], id: key });
        }

        this.setState({ guide: aGuide });
      });
  };
  fetchUserDetails = (user) => {
    this.setState({ email: user.email });
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        this.setState({ bio: doc.data().bio });
      });
  };

  render() {
    return (
      <div className="grey lighten-3">
        {/* NAVBAR  */}
        <NavBar menu={this.state.hideMenu} />

        {/* SIGN UP MODAL */}
        <SignUpModal onSignUp={this.handleSignUp} />

        {/* LOGIN MODAL  */}
        <LogInModal onLogIn={this.handleLogIn} />

        {/* ACCOUNT MODAL  */}
        <AccountDetailsModal email={this.state.email} bio={this.state.bio} />

        {/* CREATE GUIDE MODAL  */}
        <CreateGuideModal onFetchData={this.fetchData} />

        {/* GUIDE LIST  */}

        <GuideList guides={this.state.guide} />
      </div>
    );
  }
}
export default App;
