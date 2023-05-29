import React from "react";
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";

const Hero = () => {
  return (
    <section className="hero-wapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <h1>
              Find <br />
              Your Bank <br />
              한눈에 쉽고 빠르게
            </h1>
          </div>
          <div className="flexColStart hero-des">
            {/* original 
            <span className="secondaryText">Find a variety of properties that suit you very easilty</span>
            <span className="secondaryText">Forget all difficulties in finding a residence for you</span> */}
            <span>Find a variety of loan products that suit you very easily</span>
            <span>Forget all the difficulties in choosing the right loan for you</span>
          </div>
          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={3800} end={40000} duration={4} />
                <span>+</span>
              </span>
              <span className="h-primaryText">누적 이용자 수</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp start={32000} end={34700} duration={4} />
                <span>+</span>
              </span>
              <span className="h-primaryText">누적 대출비교 상품 수</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp end={3400}/>
                <span>억</span>
                <span>+</span>
              </span>
              <span className="h-primaryText">누적 대출비교 금액</span>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src="./hero-image.png" alt=""></img>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
