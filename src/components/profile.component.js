import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from 'axios';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  updateProfile() {
    this.setState({ redirect: "/update-profile" });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    const handleDeleteMember = () => {
      AuthService.deleteMember()
        .then(response => {
          // Member deletion successful
          console.log(response.data); // '회원 탈퇴 성공'
          AuthService.logout(); // Logout the user after deleting the membership information
          // Additional actions or redirect to a different page if needed
          this.setState({ redirect: "/" });
        })
        .catch(error => {
          // Handle errors, e.g., display an error message
          console.log(error);
        });
    };

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
          <button onClick={handleDeleteMember}>회원탈퇴</button>
          <button onClick={this.updateProfile.bind(this)}>회원정보 수정</button>
      </div>: null}
      </div>
    );
  }
}
