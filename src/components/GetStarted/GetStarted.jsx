import React from "react";
import "./GetStarted.css";
import { Routes, Route, Link } from "react-router-dom";


const GetStarted = () => {
  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">비교해줘</span>
          <span className="secondaryText">
            보다 쉽고 빠른 대출 서비스
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
