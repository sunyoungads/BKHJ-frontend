import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">한눈에 서비스</span>
          <span className="primaryText">쉬운 대출비교</span>
          <span className="secondaryText">
            We are always ready to help by providing the best loan services for
            you. We believe that the right financing option can make your life
            better by helping you achieve your goals.
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="felxStart">
                  <div className="flexColStart detail">
                    <span className="primaryText">담보대출</span>
                    <span className="secondaryText">
                      주택담보대출을
                      <br />
                      비교해 보세요
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">시작하기</div>
              </div>
              {/* second mode */}
              <div className="flexColCenter mode">
                <div className="felxStart">
                  <div className="flexColStart detail">
                    <span className="primaryText">금리진단</span>
                    <span className="secondaryText">
                      내 담보대출 금리를
                      <br />
                      진단해 보세요
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">시작하기</div>
              </div>
            </div>

            {/* second row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="felxStart">
                  <div className="flexColStart detail">
                    <span className="primaryText">신용대출</span>
                    <span className="secondaryText">
                      다양한 신용대출
                      <br />
                      조건을 확인하세요
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">시작하기</div>
              </div>
              {/* forth mode */}
              <div className="flexColCenter mode">
                <div className="felxStart">
                  <div className="flexColStart detail">
                    <span className="primaryText">시세조회</span>
                    <span className="secondaryText">
                      우리집 시세변동을
                      <br />
                      확인해 보세요
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">시작하기</div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
