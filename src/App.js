import React, { Component } from "react";
import { auth, firestore } from "./config/firebase-config";

import GuideList from "./GuideList/GuideList";
import AccountDetailsModal from "./Modal/AccountDetailsModal";
import CreateGuideModal from "./Modal/CreateGuideModal";
import LogInModal from "./Modal/LogInModal";
import SignUpModal from "./Modal/SignUpModal";
import NavBar from "./NavBar/NavBar";
import Spinner from "./Spinner/Spinner";
import "./App.css";
//Issue
// 1. Onload of page,for a sec login nav button is diplayed which should not be getting displayed when user is logged in.
// 2. While signing up the modal should be closed immediately after signing up.

class App extends Component {
  state = {
    email: "",
    bio: "",
    phoneNo: "",
    guide: [],
    hideMenu: false,
    emailVerified: false,
    loggedIn: false,
    loading: false,
  };
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified || user.phoneNumber) {
          this.fetchData();
          this.fetchUserDetails(user);
          this.setState({ hideMenu: true, emailVerified: true });
        } else {
          this.setState({ emailVerified: false });
        }
        this.setState({ loggedIn: true });
      } else {
        this.setState({
          guide: [],
          hideMenu: false,
          email: "",
          bio: "",
          loggedIn: false,
        });
      }
    });
  }
  fetchData = () => {
    let fetchGuide = [];
    let aGuide = [];
    this.setState({ loading: true });
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

        this.setState({ guide: aGuide, loading: false });
      });
  };
  fetchUserDetails = (user) => {
    if (user.email) {
      this.setState({ email: user.email });
    } else {
      this.setState({ email: user.phoneNumber });
    }

    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.data() !== undefined) {
          this.setState({ bio: doc.data().bio, phoneNo: doc.data().phoneNo });
        }
      });
  };
  postUserDetails = (res) => {
    console.log(res);
    firestore
      .collection("users")
      .doc(res.uid)
      .set({ bio: res.bio, phoneNo: res.phoneNo });
  };

  render() {
    let guideList;

    if (this.state.emailVerified === false) {
      console.log(this.state.emailVerified);
      guideList = (
        <div
          className="container"
          style={{ marginTop: "40px", height: "610px" }}
        >
          <div className="container alert alert-danger" role="alert">
            Please Verify Your Email
          </div>
        </div>
      );
    }
    if (this.state.loggedIn === false) {
      guideList = (
        <div
          className="container"
          style={{ marginTop: "40px", height: "610px" }}
        >
          <ul className="collapsible z-depth-0 " style={{ border: "none" }}>
            <li>
              <h5>Login to view guide</h5>
            </li>
          </ul>
        </div>
      );
    }
    if (this.state.loading) {
      guideList = (
        <div
          className="container"
          style={{ marginTop: "40px", height: "610px" }}
        >
          <Spinner />
        </div>
      );
    }
    if (this.state.guide.length > 0) {
      guideList = <GuideList guides={this.state.guide} />;
    }

    return (
      <div className="grey lighten-3">
        {/* NAVBAR  */}
        <NavBar menu={this.state.hideMenu} />

        {/* SIGN UP MODAL */}
        <SignUpModal parentCallback={this.postUserDetails} />

        {/* LOGIN MODAL  */}
        <LogInModal onLogIn={this.handleLogIn} />

        {/* ACCOUNT MODAL  */}

        <AccountDetailsModal email={this.state.email} bio={this.state.bio} />

        {/* CREATE GUIDE MODAL  */}
        <CreateGuideModal onFetchData={this.fetchData} />

        {/* GUIDE LIST  */}
        {guideList}
      </div>
    );
  }
}
export default App;
