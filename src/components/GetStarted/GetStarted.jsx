import React from "react";
import "./GetStarted.css";
import { Routes, Route, Link } from "react-router-dom";


const GetStarted = () => {
  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
        <img src="./logo.png" alt="logo" width={110} />
          <span className="secondaryText">
            보다 쉽고 빠른 대출 비교 서비스
          </span>
          <button className="button">
          <a> <Link to={"/register"}>시작하기</Link></a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
