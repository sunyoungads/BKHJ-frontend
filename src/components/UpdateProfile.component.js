import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function UpdateProfile() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  });

  // 회원정보 수정
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  //취소버튼
  const handlecancel = () => {
    navigate("/");
  }

  // 회원정보 수정
  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const { username, email, password } = state;

    AuthService.updateProfile(username, email, password)
      .then(response => {
        handleConfirmation();
        console.log(response.data); // Success message
        // Optionally, handle success, e.g., show a success message or navigate to a different page
      })
      .catch(error => {
        console.log(error);
        // Handle errors, e.g., display an error message
      });
  };

  // 회원정보 수정: 회원정보 수정시 알림문구 발생
  const handleConfirmation = () => {
    const confirmed = window.confirm("Do you want to leave the page?");
  
    if (confirmed) {
      withdrawal();
    } else {
      // Optionally, you can reset the form or perform any other actions to handle the cancellation
      // Reset the state to its initial values or fetch the latest member information again
      setState({
        username: "",
        email: "",
        password: ""
      });
    }
  };

  // 회원정보 수정: 홈 화면으로 이동 및 헤더 상태 변경
  const withdrawal = () => {
    AuthService.logout();
    alert("회원정보 수정 되었습니다.");
    navigate("/");
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Update Member Information</h3>
      </header>
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={state.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleUpdateProfile}>
          수정
        </button>
        <button className="btn btn-primary" onClick={handlecancel}>
          취소
        </button>
      </form>
    </div>
  );
}
